from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from services.userServices import UserService
from schemas.userSchema import UserSchema
from config.database import get_db
from models.userModel import UserModel
from dotenv import load_dotenv
load_dotenv()
import os



SECRET_KEY = "e841833dbdc313b931161c7ced323e99776485efa044025e7f0aedb1be20f336"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Auth():

    
    async def get_current_user(db : Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user = db.query(UserModel).filter(UserModel.username == payload.get("username")).first()
        except Exception as e:
            print(e)
            raise HTTPException(status_code=401, detail="Error")
        return UserSchema.from_orm(user)
    
    
    async def authenticate_user(username:str, password:str, db:Session):
        user = await UserService.get_user_by_name(db=db, username=username)
        if not user:
            return False
        if not user.verify_password(password):
            return False
        return user
    
    async def create_token(user: UserModel):
        user_obj = UserSchema.from_orm(user)
        token = jwt.encode(user_obj.dict(), SECRET_KEY)
        return dict(access_token=token, token_type="bearer")