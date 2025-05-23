from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(
    prefix="/users",
)

class User(BaseModel):
    name: str
    password: str

bob = User(name="Rob", password="admin123")

@router.get("/", response_model=List[User])
def get_all():
    return [bob]

@router.get("/rob", response_model=User)
def get_rob():
    return bob
