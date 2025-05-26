from fastapi import FastAPI, Depends
from pydantic import BaseModel
from typing import Union
from .database import init_tables, get_db
from .dao import UserDAO

init_tables()

app = FastAPI()

@app.get("/")
def index():
    return "Tierman is UP"

class CreateUserDTO(BaseModel): #TODO move this to a dto.py
    username: str
    email: str
    password: str

class UserNoPasswDTO(BaseModel): #TODO this too
    id: int
    username: str
    email: str

@app.post("/users/", response_model=UserNoPasswDTO)
def create_user(u: CreateUserDTO, db = Depends(get_db)):
    user_dao = UserDAO(
        username=u.username,
        email=u.email,
        password=u.password
    )
    db.add(user_dao)
    db.commit()
    db.refresh(user_dao)
    return UserNoPasswDTO(
        id=user_dao.id,
        username=user_dao.username,
        email=user_dao.email,
    )
