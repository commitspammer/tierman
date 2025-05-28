from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship#, Table
from .database import Base

class UserDAO(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    tierlists = relationship("TierlistDAO", back_populates="owner")

class TierlistDAO(Base):
    __tablename__ = "tierlists"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    is_template = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("UserDAO", back_populates="tierlists")
    tiers = relationship("TierDAO", back_populates="tierlist")
    image_assocs = relationship("ImageAssociationsDAO", back_populates="tierlist")

class TierDAO(Base):
    __tablename__ = "tiers"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    tierlist_id = Column(Integer, ForeignKey("tierlists.id")) 
    tierlist = relationship("TierlistDAO", back_populates="tiers")
    #images = relationship("ImageAssociationsDAO")

class ImageAssociationsDAO(Base):
    __tablename__ = "image_associations"
    image_id = Column(Integer, ForeignKey("images.id"), primary_key=True)
    tierlist_id = Column(Integer, ForeignKey("tierlists.id"), primary_key=True)
    tier_id = Column(Integer, ForeignKey("tiers.id"), nullable=True)
    image = relationship("ImageDAO", back_populates="image_assocs")
    tierlist = relationship("TierlistDAO", back_populates="image_assocs")

class ImageDAO(Base):
    __tablename__ = "images"
    id = Column(Integer, primary_key=True)
    path = Column(String)
    image_assocs = relationship("ImageAssociationsDAO", back_populates="image")
    #tiers = relationship("ImageAssociationsDAO")

#association_table = Table(
#    "image_associations",
#    Base.metadata,
#    Column("image_id", ForeignKey("images.id"), primary_key=True),
#    Column("tierlist_id", ForeignKey("tierlists.id"), primary_key=True)
#    Column("tier_id", ForeignKey("tiers.id"), nullable=True),
#)
