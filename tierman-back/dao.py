from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

class UserDAO(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    #tierlists = relationship("TierlistDAO")

#class TierlistDAO(Base):
#    __tablename__ = "tierlists"
#    id = Column(Integer, primary_key=True, index=True)
#    is_template = Column(String)
#    owner_id = Column(Integer, ForeignKey("users.id"))
