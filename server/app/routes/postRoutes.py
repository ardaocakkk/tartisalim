from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
import shutil
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.schemas.postSchema import PostSchema, PostCreateSchema
from app.schemas.userSchema import UserSchema
from app.services.postServices import PostService
from app.services.userServices import UserService
from app.services.commentServices import CommentService
from app.auth.auth import Auth


router = APIRouter(prefix="/posts", tags=["Posts"])

@router.get('/')
async def getAllPosts(db: Session = Depends(get_db)):
    return await PostService.getAllPosts(db=db)

@router.get("/me")
async def get_current_user_posts(user: UserSchema = Depends(Auth.get_current_user), db:Session = Depends(get_db)):
    user = await UserService.get_user_by_name(username=user.username, db=db)
    return await PostService.get_user_posts(user=user, db=db)


@router.get('/{username}')
async def getUserPostByName(username:str, db:Session = Depends(get_db)):
    return await PostService.get_post_by_username(username, db=db)

@router.get('/api/{post_id}')
async def getPostById(post_id:int, db: Session = Depends(get_db)):
    return await PostService.get_post_by_id(id=post_id, db=db)


@router.get('/isLiked/{post_id}')
async def is_post_liked(post_id:int, user: UserSchema = Depends(Auth.get_current_user), db: Session = Depends(get_db)):
    return await PostService.get_post_is_liked(user=user, post_id=post_id, db=db)

@router.post("/")
async def createPost(post:PostCreateSchema, user: UserSchema = Depends(Auth.get_current_user) ,db:Session = Depends(get_db)):
    return await PostService.create_post(post=post, db=db, user=user)


@router.delete("/{post_id}")
async def deletePost(post_id:int, user: UserSchema = Depends(Auth.get_current_user), db:Session = Depends(get_db)):
    return await PostService.delete_post_by_id(id=post_id, db=db, user=user)

@router.get('/status/{owner_id}/{post_id}')
async def get_user_post_by_id(owner_id:int, post_id: int, db: Session = Depends(get_db)):
    return await PostService.get_user_post_by_id(post_id=post_id, owner_id=owner_id, db=db)


@router.get("/{post_id}/comments")
async def get_comments_by_post_id(post_id: int, db: Session = Depends(get_db)):
    return await CommentService.get_comments_by_post_id(post_id=post_id, db=db)


@router.post('/like/{post_id}')
async def like_post_by_id(post_id: int, user: UserSchema = Depends(Auth.get_current_user), db: Session = Depends(get_db)):
    return await PostService.like_post_by_id(post_id=post_id, user=user, db=db)



@router.post('/upload')
async def uploadFile(file: UploadFile= File(...)):
    try:
        with open(file.filename, 'wb') as f:
            shutil.copyfileobj(file.file, f)
    except Exception as e:
        return {"message": "Error uploading file"}
    finally:
        file.file.close()
    return {"message": "File uploaded successfully"}