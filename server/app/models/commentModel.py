from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Table
from app.config.database import Base
from app.models.userModel import UserModel
from sqlalchemy.orm import relationship

class CommentModel(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    comment_body = Column(String, nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"))
    post_owner = relationship("PostModel", back_populates="comments")
    owner_id = Column(Integer, ForeignKey("users.id"))
    comment_owner = relationship("UserModel", back_populates="comments")
    
    comment_like = relationship(
        'UserModel', lambda: comment_like,
        primaryjoin = lambda: CommentModel.id == comment_like.c.comment_id,
        secondaryjoin = lambda: UserModel.id == comment_like.c.user_id,
        backref = 'comment_likers'
    )
    
    
    
    def like_count(self):
        return len(self.comment_like)
    
    def get_liked_users(self):
        if(self.comment_like is None):
            self.comment_like = 0
        return self.comment_like
    
    
    def isLikedByUser(self, theUser):
        if(theUser in self.comment_like):
            return True
        else:
            return False
        
    
comment_like = Table(
    'comment_like', Base.metadata,
    Column('comment_id', Integer, ForeignKey(CommentModel.id), primary_key=True),
    Column('user_id', Integer, ForeignKey(UserModel.id), primary_key=True)
)
    