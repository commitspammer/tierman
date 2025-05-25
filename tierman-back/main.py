from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union
#from .features import login
from .database import db
from .dao import UserDAO

app = FastAPI()

@app.get("/")
def index():
    return "Tierman is UP"

#app.include_router(login.router)

class CreateUserDTO(BaseModel):
    username: str
    email: str
    password: str

class UserDTO(BaseModel):
    id: str
    username: str
    email: str
    password: str

@app.post("/users/", response_model=UserDTO)
def create_user(u: CreateUserDTO, db = db):
    user_dao = UserDAO(username=u.username, email=u.email, password=u.password)
    db.add(user_dao)
    db.commit()
    db.refresh(user_dao)
    user_dto = UserDTO(id=user_dao.id, username=user_dao.username, email=user_dao.email, password=user_dao.password)
    return user_dto





#class Item(BaseModel):
#    name: str
#    price: float
#    is_offer: Union[bool, None] = None
#
#@app.get("/items/{item_id}")
#def read_item(item_id: int, q: Union[str, None] = None):
#    return {"item_id": item_id, "q": q}
#
#@app.put("/items/{item_id}")
#def update_item(item_id: int, item: Item):
#    return {"item_name": item.name, "item_id": item_id}
#
#@app.patch("/items/{item_id}", response_model=Item)
#def update_item(item_id: int, item: Item):
#    return item
