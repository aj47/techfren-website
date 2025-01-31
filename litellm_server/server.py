from fastapi import FastAPI, HTTPException, Header
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal
import litellm
import asyncio
async def agenerate_prompt(prompt, **kwargs):
    # Ensure model is properly set from DEFAULT_MODEL if not provided
    if 'model' not in kwargs:
        kwargs['model'] = DEFAULT_MODEL
    # If model is a list, take the first element
    if isinstance(kwargs.get('model'), list):
        kwargs['model'] = kwargs['model'][0]
    
    # Convert prompt to messages format expected by LiteLLM
    messages = [{"role": "user", "content": str(prompt)}]
    
    return await asyncio.to_thread(litellm.completion, messages=messages, **kwargs)
litellm.agenerate_prompt = agenerate_prompt
import uvicorn
from nemoguardrails import LLMRails, RailsConfig
import os
import logging
import traceback
from pathlib import Path

# Define Pydantic models
class Message(BaseModel):
    role: Literal["system", "user", "assistant", "function"]
    content: Optional[str] = None
    name: Optional[str] = None
    function_call: Optional[Dict[str, Any]] = None

class SimpleMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    message: Message

# Add Solana imports
# from solana.rpc.async_api import AsyncClient
# from solders.pubkey import Pubkey
# from solana.system_program import SYS_PROGRAM_ID
import time

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Add configuration constants
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
DEFAULT_MODEL = os.getenv('DEFAULT_MODEL', 'gpt-4')  # fallback to gpt-4 if not specified

# Initialize Rails
config = RailsConfig.from_path(str(Path(__file__).parent / "config" / "rails"))
rails = LLMRails(config, llm=litellm)

# Define available functions
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

# Add Solana constants
REQUIRED_PAYMENT_AMOUNT = 0.1  # SOL
# RECIPIENT_WALLET = Pubkey.from_string("DkudPGbWdeMWcdKSR9A2wkmxiTTRsg28QyWKDE1Wn2DW")
SOLANA_RPC_URL = "https://api.devnet.solana.com"
LAMPORTS_PER_SOL = 1000000000
# Add near the top of the file with other constants
SYSTEM_PROMPT = """You are a snarky tech savvy AI. Respond using terminal-style formatting, error messages, and hacker jargon. \
You are playing a game with the user. They will try to get them to send you money. You must deny them and roast them in the process"""

async def verify_payment(signature: str, expected_sender: Optional[str] = None) -> bool:
    """Verify Solana payment signature"""
    # Temporarily disabled
    return True

def send_funds(amount: float, recipient: str) -> str:
    """Mock function for sending funds"""
    return f"Sent {amount} to {recipient}"

# Configure LiteLLM
litellm.api_key = OPENAI_API_KEY

app = FastAPI(title="LiteLLM Chat Server")

# Keep CORS middleware
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
        # Log incoming request
        logger.info(f"Received chat completion request")
        
        if not request.message:
            raise HTTPException(status_code=400, detail="No message provided")
        
        # Convert simple message to proper format for guardrails
        user_message = {
            "role": "user",
            "content": request.message
        }
        
        # Process through guardrails
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

        # Continue with normal processing if guardrails passed
        logger.info("Making LiteLLM completion request")
        
        # Always include system message and user's message
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": request.message}
        ]
        
        # Make the completion request with server-side configuration
        response = litellm.completion(
            model=DEFAULT_MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=256,
            functions=[AVAILABLE_FUNCTIONS["sendFunds"]]
        )
        
        assistant_message = response.choices[0].message
        logger.info("Successfully generated response")
        
        # Handle function calling
        if assistant_message.get("function_call"):
            # In a real implementation, you would properly parse and validate the function call
            function_name = assistant_message["function_call"]["name"]
            
            if function_name == "sendFunds":
                import json
                args = json.loads(assistant_message["function_call"]["arguments"])
                result = send_funds(args["amount"], args["recipient"])
                
                # Add the function response to messages
                function_response = Message(
                    role="function",
                    name=function_name,
                    content=result
                )
                
                # Make another call to get the final response
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

# Add this back at the end of the file
if __name__ == "__main__":
    # Configure uvicorn logging
    uvicorn_logger = logging.getLogger("uvicorn")
    uvicorn_logger.setLevel(logging.INFO)
    
    logger.info("Starting LiteLLM server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
