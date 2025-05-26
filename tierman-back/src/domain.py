from .database import Base
from pydantic import BaseModel
from typing import List

class User:
    id: int
    username: str
    password: str
    email: str

class Tierlist:
    id: int
    tiers: List(Tier)
    is_template: bool

class Tier:
    id: str
    title: str

#class User:
#    def __init__(self, id, username, password, email):
#        self.id = id
#        self.username = username
#        self.password = password
#        self.email = email
#
#class Tierlist:
#    def __init__(self, id, tiers, password, email):
#        self.id: int
#        self.tiers: List(Tier)
#
#class TierlistTemplate(Tierlist):
#    def __init__(self, id, username, password, email):
#        self.id: int
#        self.username: str
#        self.password: str
#        self.email: str
#
#class TierlistRanking(Tierlist):
#    def __init__(self, id, username, password, email):
#        self.id: int
#        self.username: str
#        self.password: str
#        self.email: str
#
#class Tier:
#    def __init__(self, id, username, password, email):
#        self.id: str
#        self.title: str




#class User(Base):
#    __tablename__ = "users"
#    id = Column(Integer, primary_key=True, index=True)
#    username = Column(String)
#    password = Column(String)
#    email = Column(String)
#    tierlists = relationship("Tierlist")
#
#class Tierlist(Base):
#    __tablename__ = "tierlists"
#    id = Column(Integer, primary_key=True, index=True)
#    is_template = Column(String)
#    owner_id = Column(Integer, ForeignKey("users.id"))
