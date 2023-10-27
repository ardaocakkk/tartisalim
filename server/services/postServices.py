from fastapi import HTTPException, status, Depends
from config.database import get_db, Base
from sqlalchemy import and_
from sqlalchemy.orm import Session
from models.postModel import PostModel
from schemas.postSchema import PostSchema, PostCreateSchema
from schemas.userSchema import UserSchema
from services.userServices import UserService
from services.commentServices import CommentService
from auth.auth import Auth
from models.userModel import UserModel
from datetime import datetime


class PostService():
    async def getAllPosts(db: Session):
        data = db.query(PostModel).order_by(PostModel.id.desc()).all()
        for d in data:
            author = await UserService.get_user_by_id(id=d.owner_id, db=db)
            d.author = UserSchema.from_orm(author)
        return {"posts": data}
    
    async def get_post_by_id(id: int, db: Session):
        post = db.query(PostModel).filter(PostModel.id == id).first()
        
        if post is None :
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
        author = await UserService.get_user_by_id(id=post.owner_id, db=db)
        post.author = UserSchema.from_orm(author)
        comments = await CommentService.get_comments_by_post_id(post_id=id, db=db)
        post.comments= comments
        post.like_count = len(post.like)

        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
        
        return post
    
    async def get_user_posts(user: UserSchema,db: Session):
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user.id} not found")
        return user.post
    
    async def get_post_is_liked(user: UserSchema, post_id: int, db: Session):
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user.id} not found")
        theUser = await UserService.get_user_by_id(id=user.id, db=db)
        post = await PostService.get_post_by_id(id=post_id, db=db)
        return post.isLikedByUser(theUser)
    
    async def get_user_posts_by_user(user: UserSchema, db:Session):
        post = db.query(PostModel).filter(PostModel.owner_id == user.id).order_by(PostModel.id.desc()).all()
        return post
        
    async def get_post_and_comments_by_id(id: int, db: Session):
        post = await PostService.get_post_by_id(id=id, db=db)
        comments = await CommentService.get_comments_by_post_id(post_id=id, db=db)
        return {"post": post, "comments": comments}
    
    
    async def create_post(db: Session, post: PostCreateSchema, user: UserSchema):
        new_post = PostModel(post_body=post.post_body, owner_id=user.id, date=datetime.now())
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return new_post
    
    async def delete_post_by_id(id: int,user: UserSchema ,db: Session = Depends(get_db)):
        
        thePost = db.query(PostModel).filter_by(id=id).first()
        if thePost.owner_id != user.id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unaothorized")
        if thePost is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
        db.delete(thePost)
        db.commit()
        return {"message": "post deleted successfully"}
    

    async def get_user_post_by_id(post_id: int, owner_id:int ,db: Session):
        post = db.query(PostModel).filter((PostModel.id == post_id , PostModel.owner_id == owner_id)).first()
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {post_id} not found")
        
        return post    


    async def get_post_by_username(username:str, db: Session):
        user = await UserService.get_user_by_name(username=username, db=db)
        post = db.query(PostModel).filter(PostModel.owner_id == user.id).first()
        comments = await CommentService.get_comments_by_post_id(post_id=post.id, db=db)
        post_author = await UserService.get_user_by_name(username=username, db=db)
        post.author = UserSchema.from_orm(post_author)
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
        
        return {post}


    async def like_post_by_id(post_id: int, user: UserSchema, db: Session):
        theUser = await UserService.get_user_by_id(id=user.id, db=db)
        post = await PostService.get_post_by_id(id=post_id, db=db)
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {post_id} not found")
        if theUser.id in [theUser.id for theUser in post.like]:
            post.like.remove(theUser)
            db.commit()
            return {"message": "post unliked successfully"}
        post.like.append(theUser)
        db.commit()
        return {"message": "post liked successfully"}
    
    
    async def get_post_like_count(post_id: int, db: Session):
        post = await PostService.get_post_by_id(id=post_id, db=db)
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {post_id} not found")
        return {"like_count": post.like_count()}
    
    async def get_following_posts(user:UserSchema, db: Session):
        current_user = db.query(UserModel).filter(UserModel.id == user.id).first()
        current_user_following = current_user.get_following_users()
        posts = []
        for user in current_user_following:
            theUser = db.query(UserModel).filter(UserModel.id == user.id).first()
            user_posts = db.query(PostModel).filter(PostModel.owner_id == user.id).all()
            for post in user_posts:
                post.author = UserSchema.from_orm(theUser)
            posts.extend(user_posts)
        return posts