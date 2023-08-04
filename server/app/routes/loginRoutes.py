from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.auth.auth import Auth


router = APIRouter(prefix="/token", tags=['Token'])


@router.post('/')
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user = await Auth.authenticate_user(form_data.username, form_data.password, db=db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    return await Auth.create_token(user=user)



