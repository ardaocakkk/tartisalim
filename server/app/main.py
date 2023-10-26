from fastapi import FastAPI,APIRouter, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from routes import userRoutes, loginRoutes, postRoutes, commentRoutes, profileRoutes
from config.database import engine, Base


app = FastAPI()


origins = [
    "http://localhost:3000",
    "localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

Base.metadata.create_all(engine)


@app.get('/')
def index():
    return {'message': 'hello world'}

@app.get('/api/v1')
def welcomeMessage():
    return {'message': 'Welcome to the API'}

@app.get('/logout')
def logout(response: Response):
    response.delete_cookie(key="access_token")
    response.delete_cookie(key="refresh_token")
    return {"message": "Logout Successfull"}

app.include_router(userRoutes.router)
app.include_router(loginRoutes.router)
app.include_router(postRoutes.router)
app.include_router(commentRoutes.router)
app.include_router(profileRoutes.router)

