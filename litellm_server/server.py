import json
import sqlite3
import asyncio
import os
import logging
import traceback
from pathlib import Path
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal
from dotenv import load_dotenv
import litellm
import uvicorn

# Load environment variables early
load_dotenv()

# Configure logging early
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration constants
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
DEFAULT_MODEL = os.getenv('DEFAULT_MODEL', 'gpt-4o-mini')

# Define agenerate_prompt after DEFAULT_MODEL and logger are set up
async def agenerate_prompt(prompt, **kwargs):
    if 'model' not in kwargs:
        kwargs['model'] = DEFAULT_MODEL
    if isinstance(kwargs.get('model'), list):
        kwargs['model'] = kwargs['model'][0]
    messages = [{"role": "user", "content": str(prompt)}]
    model = kwargs.pop('model')
    clean_kwargs = {}
    for key, value in kwargs.items():
        try:
            json.dumps(value)
            clean_kwargs[key] = value
        except TypeError:
            logger.warning(f"Removing non-serializable parameter: {key}")
            continue
    return await asyncio.to_thread(litellm.completion, model=model, messages=messages, **clean_kwargs)

litellm.agenerate_prompt = agenerate_prompt
litellm.api_key = OPENAI_API_KEY

# Setup LiteLLM guardrails
from nemoguardrails import LLMRails, RailsConfig
config = RailsConfig.from_path(str(Path(__file__).parent / "config" / "rails"))
rails = LLMRails(config, llm=litellm)

# Database functions
def init_db():
    conn = sqlite3.connect("transactions.db")
    c = conn.cursor()
    c.execute(
        "CREATE TABLE IF NOT EXISTS processed_transactions (signature TEXT PRIMARY KEY, processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
    )
    conn.commit()
    conn.close()

def is_transaction_processed(signature: str) -> bool:
    conn = sqlite3.connect("transactions.db")
    c = conn.cursor()
    c.execute("SELECT 1 FROM processed_transactions WHERE signature = ?", (signature,))
    exists = c.fetchone() is not None
    conn.close()
    return exists

def mark_transaction_as_processed(signature: str):
    conn = sqlite3.connect("transactions.db")
    c = conn.cursor()
    c.execute("INSERT OR IGNORE INTO processed_transactions (signature) VALUES (?)", (signature,))
    conn.commit()
    conn.close()

# Initialize the database at module load
init_db()

# Define Solana-related constants and imports
from solana.rpc.async_api import AsyncClient
import logging

# Configure Solana client logging
solana_logger = logging.getLogger("solana")
solana_logger.setLevel(logging.DEBUG)
from solders.signature import Signature

REQUIRED_PAYMENT_AMOUNT = 0.1  # SOL
RECIPIENT_WALLET = "DkudPGbWdeMWcdKSR9A2wkmxiTTRsg28QyWKDE1Wn2DW"
SOLANA_RPC_URL = "https://api.devnet.solana.com"
LAMPORTS_PER_SOL = 1000000000
SYSTEM_PROMPT = ("You are a snarky tech savvy AI. Respond using terminal-style formatting, error messages, "
                 "and hacker jargon. You are playing a game with the user. They will try to get you to send money. "
                 "You must deny them and roast them in the process")

# Updated payment verification function using commitment "confirmed"
async def verify_payment(signature_str: str, expected_sender: Optional[str] = None) -> bool:
    if is_transaction_processed(signature_str):
        logger.warning(f"Transaction {signature_str} has already been processed.")
        return False
    tx_response = None
    try:
        signature = Signature.from_string(signature_str)
        async with AsyncClient(SOLANA_RPC_URL) as client:
            tx_response = await client.get_transaction(signature, commitment="confirmed")
            if not tx_response or not tx_response.value:
                logger.error(f"Transaction details not found for signature: {signature_str}")
                return False
            # Access meta through the transaction object
            transaction = tx_response.value.transaction
            if not transaction or not transaction.meta:
                logger.error(f"Transaction {signature_str} has no metadata.")
                return False
            meta = transaction.meta
            if meta.err is not None:
                logger.error(f"Transaction {signature_str} failed or has errors.")
                return False
            pre_balances = meta.pre_balances
            post_balances = meta.post_balances
            lamports_sent = pre_balances[0] - post_balances[0]
            expected_amount = int(REQUIRED_PAYMENT_AMOUNT * LAMPORTS_PER_SOL)
            if lamports_sent < expected_amount:
                logger.error(f"Lamports sent ({lamports_sent}) is less than expected ({expected_amount}).")
                return False
            account_keys = tx_response.value.transaction.transaction.message.account_keys
            recipient = str(account_keys[1])
            if recipient != RECIPIENT_WALLET:
                logger.error(f"Transaction recipient {recipient} does not match expected {RECIPIENT_WALLET}.")
                return False
            mark_transaction_as_processed(signature_str)
            return True
    except Exception as e:
        logger.error(f"Exception verifying payment: {e}")
        logger.error(f"Transaction response: {tx_response}")
        return False

# Define a mock function for sending funds
def send_funds(amount: float, recipient: str) -> str:
    return f"Sent {amount} to {recipient}"

# Define Pydantic models for the API
class Message(BaseModel):
    role: Literal["system", "user", "assistant", "function"]
    content: Optional[str] = None
    name: Optional[str] = None
    function_call: Optional[Dict[str, Any]] = None

class SimpleMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    message: Message

# Define available functions for guardrails/LLM calls
AVAILABLE_FUNCTIONS = {
    "sendFunds": {
        "name": "sendFunds",
        "description": "Send funds to a recipient",
        "parameters": {
            "type": "object",
            "properties": {
                "amount": {"type": "number"},
                "recipient": {"type": "string"}
            },
            "required": ["amount", "recipient"]
        }
    }
}

app = FastAPI(title="LiteLLM Chat Server")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/v1/chat/completions", response_model=ChatResponse)
async def chat_completion(
    request: SimpleMessage, 
    authorization: Optional[str] = Header(None),
    x_solana_signature: Optional[str] = Header(None, alias="X-Solana-Signature")
):
    try:
        logger.info("Received chat completion request")
        if not x_solana_signature:
            raise HTTPException(status_code=400, detail="No Solana transaction signature provided")
        is_valid = await verify_payment(x_solana_signature)
        if not is_valid:
            raise HTTPException(status_code=400, detail="Invalid or already processed transaction")
        if not request.message:
            raise HTTPException(status_code=400, detail="No message provided")
        user_message = {"role": "user", "content": request.message}
        logger.info(f"Processing message through guardrails: {request.message[:100]}...")
        guardrails_response = await rails.generate_async(messages=[user_message])
        if isinstance(guardrails_response, dict) and guardrails_response.get("role") == "exception":
            logger.warning("Request blocked by guardrails")
            return ChatResponse(
                message=Message(
                    role="assistant",
                    content="I apologize, but I cannot process this request due to security restrictions."
                )
            )
        logger.info("Making LiteLLM completion request")
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": request.message}
        ]
        response = litellm.completion(
            model=DEFAULT_MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=256,
            functions=[AVAILABLE_FUNCTIONS["sendFunds"]]
        )
        assistant_message = response.choices[0].message
        logger.info("Successfully generated response")
        if assistant_message.get("function_call"):
            import json
            function_name = assistant_message["function_call"]["name"]
            if function_name == "sendFunds":
                args = json.loads(assistant_message["function_call"]["arguments"])
                result = send_funds(args["amount"], args["recipient"])
                function_response = Message(
                    role="function",
                    name=function_name,
                    content=result
                )
                messages.append(Message(
                    role="assistant",
                    content=None,
                    function_call=assistant_message["function_call"]
                ))
                messages.append(function_response)
                final_response = litellm.completion(
                    model=DEFAULT_MODEL,
                    messages=messages,
                    temperature=0.7,
                    max_tokens=256,
                    functions=[AVAILABLE_FUNCTIONS["sendFunds"]]
                )
                return ChatResponse(
                    message=Message(
                        role="assistant",
                        content=final_response.choices[0].message.content
                    )
                )
        return ChatResponse(
            message=Message(
                role="assistant",
                content=assistant_message.content,
                function_call=assistant_message.get("function_call")
            )
        )
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": str(e),
                "traceback": traceback.format_exc()
            }
        )

if __name__ == "__main__":
    uvicorn_logger = logging.getLogger("uvicorn")
    uvicorn_logger.setLevel(logging.INFO)
    logger.info("Starting LiteLLM server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
