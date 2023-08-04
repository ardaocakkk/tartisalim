from fastapi import HTTPException, status, Depends
from app.config.database import get_db, Base
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from datetime import datetime
from app.schemas.userSchema import UserSchema
from app.models.commentModel import CommentModel
from app.schemas.commentSchema import CommentSchema, CommentInDB
from app.services.userServices import UserService
from app.models.userModel import UserModel


class CommentService():
    async def get_all_comments(db: Session):
        data = db.query(CommentModel).order_by(CommentModel.id.desc()).all()
        return data
    
    async def create_comment(db: Session, comment: CommentSchema, user: UserSchema):
        new_comment = CommentModel(comment_body=comment.comment_body, owner_id=user.id, post_id=comment.post_id)
        db.add(new_comment)
        db.commit()
        db.refresh(new_comment)
        return new_comment
    
    
    async def get_comments_by_post_id(post_id:int, db:Session):
        comments = db.query(CommentModel).filter(CommentModel.post_id == post_id).order_by(CommentModel.id.desc()).all()
        if not comments:
            comments = []
        for comment in comments:
            comment.author = UserSchema.from_orm(db.query(UserModel).filter(comment.owner_id == UserModel.id).first())
            comment.like_count = comment.like_count()
        return comments
    
    
    
    async def get_post_comments(post_id:int, db:Session):
        comments = db.query(CommentModel).filter(CommentModel.post_id == post_id).order_by(CommentModel.id.desc()).all()
        if not comments:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {post_id} not found")
        return comments
    
    async def delete_comment_by_id(id: int,user: UserSchema ,db: Session = Depends(get_db)):
        
        theComment = db.query(CommentModel).filter_by(id=id).first()
        if theComment.owner_id != user.id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unaothorized")
        if theComment is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
        db.delete(theComment)
        db.commit()
        return {"message": "Comment deleted successfully"}
    
    async def get_comment_by_id(id:int, db:Session):
        comment = db.query(CommentModel).filter(CommentModel.id == id).first()
        if not comment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Comment with id {id} not found")
        comment.comment_like
        comment.comment_like_count = comment.like_count()
        return comment
    
    async def get_user_comment_by_id(id:int, owner_id:int, db:Session):
        comment = db.query(CommentModel).filter(CommentModel.id == id, CommentModel.owner_id == owner_id).first()
        if not comment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Comment with id {id} not found")
        return comment
    
    
    async def get_current_user_comment(id:int, user: UserSchema, db:Session):
        comment = db.query(CommentModel).filter(CommentModel.id == id, CommentModel.owner_id == user.id).first()
        if not comment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Comment with id {id} not found")
        return comment  
    
    async def get_current_user_comments(user: UserSchema, db:Session):
        comment = db.query(CommentModel).filter(CommentModel.owner_id == user.id).order_by(CommentModel.id.desc()).all()
        return comment
    
    async def get_user_comments(owner_id:int, db:Session):
        user_comments = db.query(CommentModel).filter(CommentModel.owner_id == owner_id).order_by(CommentModel.id.desc()).all()
        return  user_comments
    
    async def like_comment_by_id(comment_id:int, user: UserSchema, db:Session):
        theUser = await UserService.get_user_by_id(id=user.id, db=db)
        comment = db.query(CommentModel).filter(CommentModel.id == comment_id).first()
        if not comment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Comment with id {comment_id} not found")
        if theUser.id in [theUser.id for theUser in comment.comment_like]:
            comment.comment_like.remove(theUser)
            db.commit()
            return {"message": "comment unliked successfully"}
        comment.comment_like.append(theUser)
        db.commit()
        return {"message": "comment liked successfully"}
    
    
    async def get_comment_like_count(comment_id: int, db: Session):
        comment = await CommentService.get_comment_by_id(id=comment_id, db=db)
        if not comment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {comment_id} not found")
        return {"like_count": comment.like_count()}
    
    
    async def get_user_is_liked_commment(user: UserSchema, comment_id: int, db: Session):
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user.id} not found")
        theUser = await UserService.get_user_by_id(id=user.id, db=db)
        comment = await CommentService.get_comment_by_id(id=comment_id, db=db)
        return comment.isLikedByUser(theUser)