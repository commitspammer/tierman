#from fastapi import APIRouter
#from pydantic import BaseModel
#from typing import List
#
#router = APIRouter(
#    prefix="/users",
#)
#
#class User(BaseModel):
#    username: str
#    password: str
#
#bob = User(username="Rob", password="admin123")
#
#@router.get("/", response_model=List[User])
#def get_all():
#    return [bob]
#
#@router.get("/rob", response_model=User)
#def get_rob():
#    return bob
#
#@router.post("/")
#def signUp():
#    return bob
