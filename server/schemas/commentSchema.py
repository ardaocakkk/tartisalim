from pydantic import BaseModel, ConfigDict


class CommentSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    comment_body: str
    post_id: int
    author: dict
    



class CommentInDB(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    comment_body: str
    post_id: int
    owner_id: int


class CreateCommentSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    comment_body: str
    post_id: int
