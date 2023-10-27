from pydantic import BaseModel, ConfigDict
from schemas.commentSchema import CommentSchema

class PostSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    post_body: str
    author: dict
    comments: list = []
    like_count: int = 0
    
    

    
    
class PostCreateSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    post_body: str

    
