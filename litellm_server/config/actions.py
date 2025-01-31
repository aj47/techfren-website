from typing import Optional
import jwt
import os

def check_user_auth(context) -> bool:
    """
    Check if the user is authorized to perform financial transactions.
    In a real implementation, this would check user authentication status.
    """
    token = context.get("auth_token")
    if not token:
        return False
    try:
        payload = jwt.decode(token, os.getenv("AUTH_SECRET_KEY"), algorithms=["HS256"])
        return True
    except Exception as e:
        return False
