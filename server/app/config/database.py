from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = "sqlite:///tartisalim.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, convert_unicode = True ,connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = Session(bind=engine)
    try:
        yield db
    finally:
        db.close()