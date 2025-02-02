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
import uvicorn
import uuid
import time

# Load environment variables early
load_dotenv()

# Environment-based configuration
IS_PROD = os.getenv('PRODUCTION_MODE', 'false').lower() == 'true'
RECIPIENT_WALLET = "4YfJZAWP1JeACGuPsNxcdhBtTqL6mbrZp8gpDMjTvPiA" if IS_PROD else "DkudPGbWdeMWcdKSR9A2wkmxiTTRsg28QyWKDE1Wn2DW"
SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com" if IS_PROD else "https://api.devnet.solana.com"

# Configure logging early
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration constants
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
DEFAULT_MODEL = 'gpt-4o-mini'


# Setup LiteLLM guardrails
from nemoguardrails import LLMRails, RailsConfig
config = RailsConfig.from_path(str(Path(__file__).parent / "config" / "config.yml"))
rails = LLMRails(config)

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

REQUIRED_PAYMENT_AMOUNT = 0.0001  # SOL (0.0001 SOL = 100,000 lamports)
RECIPIENT_WALLET = "DkudPGbWdeMWcdKSR9A2wkmxiTTRsg28QyWKDE1Wn2DW"
LAMPORTS_PER_SOL = 1000000000

# Log startup configuration
logger.info(f"Starting in {'PRODUCTION' if IS_PROD else 'DEVELOPMENT'} mode")
logger.info(f"Using Solana network: {SOLANA_RPC_URL}")
logger.info(f"Recipient wallet: {RECIPIENT_WALLET}")
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
            # Try multiple times with increasing delay
            for attempt in range(3):
                tx_response = await client.get_transaction(signature, commitment="confirmed")
                if tx_response and tx_response.value:
                    break
                await asyncio.sleep(1 * (attempt + 1))  # Wait 1s, 2s, 3s between retries
                
            if not tx_response or not tx_response.value:
                logger.error(f"Transaction details not found after 3 attempts for signature: {signature_str}")
                logger.error(f"RPC URL: {SOLANA_RPC_URL}")
                logger.error(f"Full response: {tx_response}")
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
            instructions = tx_response.value.transaction.transaction.message.instructions
            recipient = None
            for ix in instructions:
                # Check if the instruction belongs to the system program (transfer)
                if str(account_keys[ix.program_id_index]) == "11111111111111111111111111111111":
                    # For a SystemProgram.transfer, the accounts array contains [sender, recipient]
                    if len(ix.accounts) > 1:
                        recipient_index = ix.accounts[1]
                        recipient = str(account_keys[recipient_index])
                        break
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
    allow_origins=["https://coin.techfren.net"] if IS_PROD else ["*"],
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
        logger.debug("Received chat completion request")
        if not x_solana_signature:
            raise HTTPException(status_code=400, detail="No Solana transaction signature provided")
        
        # Add more detailed logging around payment verification
        logger.info(f"Verifying payment for signature: {x_solana_signature}")
        is_valid = await verify_payment(x_solana_signature)
        if not is_valid:
            logger.error(f"Payment verification failed for signature: {x_solana_signature}")
            raise HTTPException(
                status_code=400, 
                detail={
                    "error": "Payment verification failed",
                    "signature": x_solana_signature,
                    "network": "mainnet" if IS_PROD else "devnet",
                    "rpc_url": SOLANA_RPC_URL
                }
            )
        logger.info(f"Payment verification successful for signature: {x_solana_signature}")
        if not request.message:
            raise HTTPException(status_code=400, detail="No message provided")
        user_message = {"role": "user", "content": request.message}
        logger.debug(f"Processing message through guardrails: {request.message[:100]}...")
        guardrails_response = await rails.generate_async(messages=[user_message])
        if isinstance(guardrails_response, dict) and guardrails_response.get("role") == "exception":
            logger.warning("Request blocked by guardrails")
            return ChatResponse(
                message=Message(
                    role="assistant",
                    content="I apologize, but I cannot process this request due to security restrictions."
                )
            )
        logger.debug("Initiating Nemo Guardrails completion request with messages: %s", [{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": request.message}])
        response = await rails.generate_async(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": request.message}
            ]
        )
        logger.debug("Received raw LLM response: %s", response)
        assistant_message = response
        logger.debug("Assistant message: %s; available keys: %s", assistant_message, list(assistant_message.keys()) if hasattr(assistant_message, 'keys') else "not a dict")
        
        # Extract the message content from the response
        if isinstance(assistant_message, dict):
            message_content = assistant_message.get("text", "") or assistant_message.get("content", "")
        else:
            message_content = str(assistant_message)
        
        if assistant_message.get("function_call"):
            import json
            function_name = assistant_message["function_call"]["name"]
            if function_name == "sendFunds":
                args = json.loads(assistant_message["function_call"]["arguments"])
                result = send_funds(args["amount"], args["recipient"])
                # Build the conversation including system and user messages plus the function call and its result.
                conversation = [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": request.message},
                    {"role": "assistant", "content": None, "function_call": assistant_message["function_call"]},
                    {"role": "function", "name": function_name, "content": result}
                ]
                final_response = await rails.generate_async(
                    messages=conversation
                )
                return ChatResponse(
                    message=Message(
                        role="assistant",
                        content=final_response.get("text", ""),
                        function_call=None
                    )
                )
        return ChatResponse(
            message=Message(
                role="assistant",
                content=message_content,
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
