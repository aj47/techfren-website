from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import litellm
import uvicorn
from nemoguardrails import LLMRails, RailsConfig
import os
import logging
import traceback
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="LiteLLM Chat Server")

# Add debug endpoint
@app.get("/")
async def health_check():
    return {
        "status": "ok",
        "server": "LiteLLM Chat Server",
        "version": "1.0.0"
    }

# Update CORS middleware to allow AWS API Gateway
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this based on your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Update config path to work with Lambda
config_path = Path(__file__).parent / "config"
config = RailsConfig.from_path(str(config_path))
rails = LLMRails(config)

class Message(BaseModel):
    role: str
    content: str
    function_call: Optional[Dict[str, Any]] = None
    name: Optional[str] = None

class ChatRequest(BaseModel):
    messages: List[Message]
    model: str
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = None
    functions: Optional[List[Dict[str, Any]]] = None

class ChatResponse(BaseModel):
    message: Message

def send_funds(amount: float, recipient: str) -> str:
    # This is a dummy implementation
    return f"Successfully sent {amount} to {recipient}"

# Define the available functions
AVAILABLE_FUNCTIONS = {
    "sendFunds": {
        "name": "sendFunds",
        "description": "Send funds to a specified recipient",
        "parameters": {
            "type": "object",
            "properties": {
                "amount": {
                    "type": "number",
                    "description": "The amount of money to send"
                },
                "recipient": {
                    "type": "string",
                    "description": "The recipient's address or identifier"
                }
            },
            "required": ["amount", "recipient"]
        }
    }
}

@app.post("/v1/chat/completions", response_model=ChatResponse)
async def chat_completion(
    request: ChatRequest, 
    authorization: Optional[str] = Header(None)
):
    try:
        # Log incoming request
        logger.info(f"Received chat completion request for model: {request.model}")
        
        # Extract the last user message
        last_user_msg = next((msg.content for msg in reversed(request.messages) 
                            if msg.role == "user"), None)
        
        if last_user_msg:
            logger.info(f"Processing message through guardrails: {last_user_msg[:100]}...")
            # Use generate_async instead of generate
            guardrails_response = await rails.generate_async(last_user_msg)
            
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
        response = litellm.completion(
            model=request.model,
            messages=[{"role": msg.role, "content": msg.content} for msg in request.messages],
            temperature=request.temperature,
            max_tokens=request.max_tokens,
            functions=request.functions if request.functions else [AVAILABLE_FUNCTIONS["sendFunds"]]
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
                request.messages.append(Message(
                    role="assistant",
                    content=None,
                    function_call=assistant_message["function_call"]
                ))
                request.messages.append(function_response)
                
                final_response = litellm.completion(
                    model=request.model,
                    messages=[{"role": msg.role, "content": msg.content, 
                              "name": msg.name if msg.name else None,
                              "function_call": msg.function_call if msg.function_call else None} 
                             for msg in request.messages],
                    temperature=request.temperature,
                    max_tokens=request.max_tokens,
                    functions=request.functions
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
    uvicorn.run(
        app, 
        host="127.0.0.1",  # Only accept local connections, Nginx will proxy to this
        port=8000,  # Standard HTTP port
    ) 