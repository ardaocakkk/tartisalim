from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Table
from config.database import Base, get_db, Session
from sqlalchemy.orm import relationship
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserModel(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)    
    roles = Column(String, default="user")
    profile_img = Column(String, default="https://www.gravatar.com/avatar/0")
    
    following = relationship(
        'UserModel', lambda: user_following,
        primaryjoin=lambda: UserModel.id == user_following.c.user_id,
        secondaryjoin=lambda: UserModel.id == user_following.c.following_id,
        backref='followers',
    )
    post = relationship("PostModel", back_populates="owner")
    comments = relationship("CommentModel", back_populates="comment_owner")
    
    def verify_password(self, password):
        return pwd_context.verify(password, self.password)
    
    
    def is_following(self, theUser):
        if(theUser in self.following):
            return True
        else:
            return False
    
    def isFollower(self, theUser):
        if(theUser in self.followers):
            return True
        else:
            return False
    
    def follow_user(self, theUser):
        if not self.is_following(theUser):
            self.following.append(theUser)
        else:
            return "Already following"
        
    def get_following_users(self):
        return self.following
    
    def get_profile_img(self):
        return self.profile_img

    
    
    def unfollow_user(self, theUser):
        if not self.is_following(theUser):
            return {"message": "Not following"}
        else:
            self.following.remove(theUser)    
            
    def removeFromFollowers(self, theUser):
        if not self.isFollower(theUser):
            return {"message": "Not a follower"}
        self.followers.remove(theUser)
            


    
    
user_following = Table(
    'user_following', Base.metadata,
    Column('user_id', Integer, ForeignKey(UserModel.id), primary_key=True),
    Column('following_id', Integer, ForeignKey(UserModel.id), primary_key=True)
)





    
    
    

    