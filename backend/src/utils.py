from fastapi import HTTPException
from clerk_backend_api import Clerk, AuthenticateRequestOptions
import os
from dotenv import load_dotenv

load_dotenv()

clerk = Clerk(
    api_key=os.getenv("CLERK_SECRET_KEY"),
    jwt_secret=os.getenv("JWT_SECRET_KEY")
)


def authenticate_request(request) -> dict:
    try:
        request_state = clerk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:3000/"],
                jwt_key=os.getenv("JWT_SECRET_KEY")
            ),

        )
        if not request_state.is_authenticated:
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        user_id = request_state.payload.get("sub")

        return {"user_id": user_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))