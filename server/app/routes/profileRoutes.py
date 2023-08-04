from app.services.profileService import ProfileService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.schemas.commentSchema import CommentSchema, CommentInDB
from app.schemas.userSchema import UserSchema
from app.services.commentServices import CommentService
from app.services.userServices import UserService
from app.auth.auth import Auth


router = APIRouter(prefix='/profile', tags=['Profile'])


@router.get('/me')
async def get_current_user_profile(db: Session = Depends(get_db), user: UserSchema = Depends(Auth.get_current_user)):
    return await ProfileService.get_current_user_post_and_comments(db=db, user=user)


@router.get('/{username}')
async def get_user_profile(username: str, db: Session = Depends(get_db)):
    return await ProfileService.get_user_post_and_comments(db=db, username=username)

