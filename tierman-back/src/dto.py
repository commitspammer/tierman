from pydantic import BaseModel
from typing import Optional#, Union

class CreateUserDTO(BaseModel):
    username: str
    email: str
    password: str

class UserNoPasswDTO(BaseModel):
    id: int
    username: str
    email: str

class LoginDTO(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: str

class JWTDTO(BaseModel):
    jwt: str

class CreateTierlistDTO(BaseModel):
    name: str
