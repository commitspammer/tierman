from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union
#from .features import login
from .dao import User

app = FastAPI()

@app.get("/")
def index():
    return "Tierman is UP"

#app.include_router(login.router)

@app.post("/users/")
def create_user():
    raise Exception("Not yet implemented")





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
