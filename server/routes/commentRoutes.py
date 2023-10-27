from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from config.database import get_db
from schemas.commentSchema import CommentSchema, CommentInDB
from schemas.userSchema import UserSchema
from services.commentServices import CommentService
from schemas.commentSchema import CreateCommentSchema
from services.userServices import UserService
from auth.auth import Auth


router = APIRouter(prefix="/comments", tags=["Comments"])

@router.get('/')
async def get_all_comments(db:Session = Depends(get_db)):
    return await CommentService.get_all_comments(db=db)

@router.post("/")
async def create_comment(comment: CreateCommentSchema,db:Session = Depends(get_db), user: UserSchema = Depends(Auth.get_current_user)):
    return await CommentService.create_comment(user=user,db=db, comment=comment)

@router.get("/api/me")
async def get_current_user_comments(db:Session = Depends(get_db), user: UserSchema = Depends(Auth.get_current_user)):
    return await CommentService.get_current_user_comments(user=user, db=db)

@router.delete('/{comment_id}')
async def delete_comment(comment_id:int, user: UserSchema = Depends(Auth.get_current_user), db:Session = Depends(get_db)):
    return await CommentService.delete_comment_by_id(id=comment_id, db=db, user=user)

@router.get('/{comment_id}')
async def get_comment_by_id(comment_id: int, db: Session = Depends(get_db)):
    return await CommentService.get_comment_by_id(id=comment_id, db=db)

@router.get("/{owner_id}/{comment_id}")
async def get_user_comment_by_id(owner_id:int, comment_id: int, db: Session = Depends(get_db)):
    return await CommentService.get_user_comment_by_id(id=comment_id, owner_id=owner_id, db=db)


@router.get("/{owner_id}")
async def get_user_comments(owner_id:int, db: Session = Depends(get_db)):
    return await CommentService.get_user_comments(owner_id=owner_id, db=db)


@router.post("/{comment_id}/like")
async def like_comment_by_id(comment_id: int, user: UserSchema = Depends(Auth.get_current_user), db: Session = Depends(get_db)):
    return await CommentService.like_comment_by_id(comment_id=comment_id, user=user, db=db)

@router.get('/a/isLiked/{comment_id}')
async def get_user_is_liked_comment(comment_id: int, user: UserSchema = Depends(Auth.get_current_user), db: Session = Depends(get_db)):
    return await CommentService.get_user_is_liked_commment(comment_id=comment_id, user=user, db=db)