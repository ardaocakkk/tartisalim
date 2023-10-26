from fastapi import HTTPException, status, Depends
from config.database import get_db, Base
from sqlalchemy.orm import Session
from datetime import datetime
from schemas.userSchema import UserSchema
from auth.auth import Auth
from services.userServices import UserService
from services.postServices import PostService
from services.commentServices import CommentService
from models.commentModel import CommentModel
from schemas.commentSchema import CommentSchema, CommentInDB
import sys


class ProfileService():
    async def get_current_user_post_and_comments(db: Session, user: UserSchema = Depends(Auth.get_current_user)):
        user = await UserService.get_user_by_name(username=user.username, db=db)
        user_posts =  await PostService.get_user_posts(user=user, db=db)
        if user_posts is None:
            user_posts = []
        user_comments = await CommentService.get_current_user_comments(user=user, db=db)
        if user_comments is None:
            user_comments = []
            
        for post in user_posts:
            post.author = UserSchema.from_orm(user)
            
        user_followers = await UserService.get_user_followers(username=user.username, db=db)
        user_followings = await UserService.get_user_followings(username=user.username, db=db)
        
        return {'posts': user_posts,'comments': user_comments,  'user': {'username': user.username, 'email': user.email, "profile_image": user.profile_img ,'followers': user_followers, 'followings': user_followings, "follower_count": len(user_followers), "following_count": len(user_followings) }}
    
    
    async def get_user_post_and_comments(db: Session, username:str):
        user = await UserService.get_user_by_name(username=username, db=db)
        user_posts =  await PostService.get_user_posts(user=user, db=db)
        if user_posts is None:
            user_posts = []
        user_comments = await CommentService.get_current_user_comments(user=user, db=db)
        if user_comments is None:
            user_comments = []
        for post in user_posts:
            post.author = UserSchema.from_orm(user)
        user_followers = await UserService.get_user_followers(username=user.username, db=db)
        user_followings = await UserService.get_user_followings(username=user.username, db=db)

        return {'posts': user_posts, 'comments': user_comments, 'user': {'username': user.username, 'email': user.email, "profile_image": user.profile_img , 'followers': user_followers, 'followings': user_followings, "follower_count": len(user_followers), "following_count": len(user_followings) }   }

        