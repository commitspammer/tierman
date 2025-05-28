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

class CreateImageDTO(BaseModel):
    path: str

class CreateTierDTO(BaseModel):
    name: str
    images: List[CreateImageDTO]

class CreateTierlistDTO(BaseModel):
    name: str
    tiers: List[CreateTierDTO]

class ImageDTO(BaseModel):
    id: int
    #tierlist_id: int
    tier_id: int
    path: str

class TierDTO(BaseModel):
    id: int
    tierlist_id: int
    name: str
    images: List[ImageDTO]

class TierlistDTO(BaseModel):
    id: int
    owner_id: int
    name: str
    tiers: List[TierDTO]
