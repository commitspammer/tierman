from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

class UserDAO(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    tierlists = relationship("TierlistDAO", back_populates="user")

class TierlistDAO(Base):
    __tablename__ = "tierlists"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    is_template = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("UserDAO", back_populates="tierlists")
    tiers = relationship("TierDAO", back_populates="tierlist", cascade="all,delete")

class TierDAO(Base):
    __tablename__ = "tiers"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    tierlist_id = Column(Integer, ForeignKey("tierlists.id")) 
    tierlist = relationship("TierlistDAO", back_populates="tiers")
    images = relationship("ImageDAO", back_populates="tier", cascade="all,delete")

class ImageDAO(Base):
    __tablename__ = "images"
    id = Column(Integer, primary_key=True)
    path = Column(String)
    tier_id = Column(Integer, ForeignKey("tiers.id")) 
    tier = relationship("TierDAO", back_populates="images")
    #tierlist_id = Column(Integer, ForeignKey("tierlists.id")) 
    #tierlist = relationship("TierlistDAO", back_populates="tiers")
