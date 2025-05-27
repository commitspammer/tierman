from pydantic import BaseModel
from typing import List, Optional#, Union

class CreateUserDTO(BaseModel):
    username: str
    email: str
    password: str

class UserNoPasswDTO(BaseModel):
    id: int
    username: str
    email: str

class LoginDTO(BaseModel):
    login: str
    password: str

class JWTDTO(BaseModel):
    jwt: str

class CreateTierlistDTO(BaseModel):
    name: str

class TierlistDTO(BaseModel):
    id: int
    owner_id: int
    name: str
    tiers: List[str]
