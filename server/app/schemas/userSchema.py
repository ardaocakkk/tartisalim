from pydantic import BaseModel, EmailStr,ConfigDict, Field
from typing import Optional

class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    username: str
    email: EmailStr
    is_active: bool
    roles: str 
    posts: list = []
    profile_img: str = Field(None)

class UserCreateSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    username: str
    email: EmailStr
    password: str
    
class UserUpdateSchema(UserSchema):
    model_config = ConfigDict(from_attributes=True)
    
    username: str
    email: EmailStr
    is_active: bool
    roles: str


class UserWithFollow(UserSchema):
    model_config = ConfigDict(from_attributes=True)
    
    following: list = []
    followers: list = []