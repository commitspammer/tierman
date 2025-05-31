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

class UpdateUserDTO(BaseModel):
    username: str
    email: str
    password: Optional[str] = None

class CreateImageDTO(BaseModel):
    path: str

class CreateTierDTO(BaseModel):
    name: str
    color: str

class CreateTierlistDTO(BaseModel):
    name: str
    tiers: List[CreateTierDTO]
    images: List[CreateImageDTO]

class ImageDTO(BaseModel):
    id: int
    tierlist_id: int
    tier_id: Optional[int]
    path: str

class TierDTO(BaseModel):
    id: int
    tierlist_id: int
    name: str
    color: str
    images: List[ImageDTO]

class TierlistDTO(BaseModel):
    id: int
    owner_id: int
    name: str
    is_template: bool
    tiers: List[TierDTO]
    bag: List[ImageDTO]

class TierlistCoverDTO(BaseModel):
    id: int
    owner_id: int
    name: str
    is_template: bool
    cover_image_path: Optional[str] = None

class UploadedImagesDTO(BaseModel):
    paths: List[str]
