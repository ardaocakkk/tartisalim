from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from config.database import get_db
from schemas.userSchema import UserSchema, UserCreateSchema, UserUpdateSchema
from services.userServices import UserService
from auth.auth import Auth


router = APIRouter(prefix="/users", tags=["Users"])

@router.get('/')
async def getAllUsers(username:str = '', db: Session = Depends(get_db) ):
    if not username:
        return await UserService.getAllUsers(db=db)
    return await UserService.get_user_include_the_letters(username=username, db=db)
    
@router.get('/{username}')
async def getUserByName(username: str, db: Session = Depends(get_db)):
    return await UserService.get_user_by_name(username=username, db=db)

@router.get('/api/me')
async def get_user(user: UserSchema = Depends(Auth.get_current_user)):
    return user

@router.get('/api/{id}')
async def getUserById(id:int, db: Session = Depends(get_db)):
    return await UserService.get_user_by_id(id=id,db=db)

@router.post("/")
async def createUser(user:UserCreateSchema, db:Session = Depends(get_db)):
    return await UserService.create_user(user=user, db=db)

@router.get('/followers/{username}')
async def get_user_followers_by_username(username:str, db:Session = Depends(get_db)):
    return await UserService.get_user_followers(username=username, db=db)

@router.get('/following/{username}')
async def get_user_followings_by_username(username:str, db:Session = Depends(get_db)):
    return await UserService.get_user_followings(username=username, db=db)


@router.get('/follow/{username}')
async def follow_user(username:str, db:Session = Depends(get_db), current_user: UserSchema = Depends(Auth.get_current_user)):
    return await UserService.follow_user(username=username, db=db, current_user=current_user)

@router.get('/isfollowing/{username}')
async def isFollowing(username:str, db:Session = Depends(get_db), current_user: UserSchema = Depends(Auth.get_current_user)):
    return await UserService.is_following(username=username, db=db, current_user=current_user)

@router.get('/isfollower/{username}')
async def isFollower(username:str, db:Session = Depends(get_db), current_user: UserSchema = Depends(Auth.get_current_user)):
    return await UserService.is_follower(username=username, db=db, current_user=current_user)

@router.delete('/a/{id}')
async def deleteUser(id:int, db:Session = Depends(get_db)):
    return  await UserService.deleteUserByID(id, db=db)

@router.delete('/following/{username}')
async def unfollow_user(username:str, db:Session = Depends(get_db), current_user: UserSchema = Depends(Auth.get_current_user)):
    return await UserService.unfollow_user(username=username, db=db, current_user=current_user)


@router.delete('/followers/{username}')
async def remofeUserFromFollowers(username:str , db:Session = Depends(get_db), current_user: UserSchema = Depends(Auth.get_current_user)):
    return await UserService.remove_user_from_followers(username=username, db=db, current_user=current_user)