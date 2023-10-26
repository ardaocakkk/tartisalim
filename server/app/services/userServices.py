from fastapi import HTTPException, status, Depends
from config.database import get_db, Base
from sqlalchemy.orm import Session
from models.userModel import UserModel
from schemas.userSchema import UserSchema, UserCreateSchema, UserUpdateSchema, UserWithFollow
from config.hashing import Hashing
from hashlib import md5
from models.commentModel import CommentModel


class UserService():
    async def getAllUsers(db: Session):
        users = db.query(UserModel).all()
        return  users
    
    
    async def get_user_by_name(username: str, db: Session):
        user = db.query(UserModel).filter(UserModel.username == username).first()
        user.following
        user.followers

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with username {username} not found")
        return user
    
    
    async def get_user_include_the_letters(username: str, db: Session):
        users = db.query(UserModel).filter(UserModel.username.like(f"%{username}%")).all()
        return users
    
    

    
    async def get_user_by_id(id: int, db:Session):
        user = db.query(UserModel).filter(UserModel.id == id).first()
        user.followers
        user.following
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found")
        return user
    
    async def get_gravatar_url(username:str) -> str:
        hashed_username = md5(username.lower().encode('utf-8')).hexdigest()
        return f"https://www.gravatar.com/avatar/{hashed_username}?d=identicon&s={80}"
    
    async def create_user(user: UserCreateSchema, db: Session):
        gravatar_url = await UserService.get_gravatar_url(user.username)
        new_user = UserModel(
            username=user.username,
            password= Hashing.hash_password(user.password),
            email=user.email,
            profile_img = gravatar_url
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    
    
    async def deleteUserByID(id: int, db: Session = Depends(get_db)):
        theUser = db.query(UserModel).filter_by(id=id).first()
        if theUser is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        db.delete(theUser)
        db.commit()
        return {"message": "user deleted successfully"}
    
    
    async def get_user_followers(username: str, db: Session):
        user = db.query(UserModel).filter(UserModel.username == username).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with username {username} not found")
        
        return user.followers
    
    async def get_user_followings(username: str, db: Session):
        user = db.query(UserModel).filter(UserModel.username == username).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with username {username} not found")
        return user.following
    
    async def is_follower(username: str, db: Session, current_user: UserSchema):
        user = db.query(UserModel).filter(UserModel.username == username).first()
        theCurrentUser = db.query(UserModel).filter(UserModel.username == current_user.username).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with username {username} not found")
        return { theCurrentUser.isFollower(user)}
    
    
    async def is_following(username: str, db: Session, current_user: UserSchema):
        user = db.query(UserModel).filter(UserModel.username == username).first()
        theCurrentUser = db.query(UserModel).filter(UserModel.username == current_user.username).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with username {username} not found")
        return {'is_following': theCurrentUser.is_following(user)}
    
    async def follow_user(username: str, db: Session, current_user: UserSchema):
        user = db.query(UserModel).filter(UserModel.username == username).first()
        currentUser = db.query(UserModel).filter(UserModel.username == current_user.username).first()
        currentUser.follow_user(user)
        db.commit()
        db.refresh(currentUser)
        db.refresh(user)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with username {username} not found")
        return {"message": "followed successfully"  }
    
    async def unfollow_user(username: str, db: Session, current_user: UserSchema):
        user = db.query(UserModel).filter(UserModel.username == username).first()
        currentUser = db.query(UserModel).filter(UserModel.username == current_user.username).first()
        currentUser.unfollow_user(user)
        db.commit()
        db.refresh(currentUser)
        db.refresh(user)
        return {"message": "unfollowed successfully"}
    
    
    async def remove_user_from_followers(username:str , current_user: UserSchema, db: Session):
        user = db.query(UserModel).filter(UserModel.username == username).first()
        currentUser = db.query(UserModel).filter(UserModel.username == current_user.username).first()
        currentUser.removeFromFollowers(user)
        db.commit()
        db.refresh(currentUser)
        db.refresh(user)
        return {"message": "removed successfully"}

    
    