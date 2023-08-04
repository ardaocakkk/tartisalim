from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Table
from app.config.database import Base
from app.models.userModel import UserModel
from sqlalchemy.orm import relationship

class PostModel(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    post_body = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("UserModel", back_populates="post")
    comments = relationship("CommentModel", back_populates="post_owner")
    
    like = relationship(
        'UserModel', lambda: post_like,
        primaryjoin = lambda: PostModel.id == post_like.c.post_id,
        secondaryjoin = lambda: UserModel.id == post_like.c.user_id,
        backref = 'likers'
    )
    
    def like_count(self):
        return len(self.like)
    
    def get_liked_users(self):
        if(self.like is None):
            self.like = 0
        return self.like
    
    
    def isLikedByUser(self, theUser):
        if(theUser in self.like):
            return True
        else:
            return False
    
    
    
    
post_like = Table(
    'post_like', Base.metadata,
    Column('post_id', Integer, ForeignKey(PostModel.id), primary_key=True),
    Column('user_id', Integer, ForeignKey(UserModel.id), primary_key=True)
)