from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union, Optional
from .database import init_tables, get_db
from .dao import UserDAO, TierlistDAO, TierDAO, ImageDAO
from .dto import CreateUserDTO, UserNoPasswDTO, LoginDTO, JWTDTO
from .dto import CreateTierlistDTO, CreateTierDTO, CreateImageDTO, TierlistDTO, TierDTO, ImageDTO

init_tables()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

@app.get("/")
def index():
    return "Tierman is UP"

@app.post("/users", response_model=UserNoPasswDTO)
def create_user(u: CreateUserDTO, db = Depends(get_db)):
    user_dao = UserDAO( #TODO validate for empty string
        username=u.username,
        email=u.email,
        password=u.password
    )
    db.add(user_dao)
    db.commit()
    db.refresh(user_dao)
    return UserNoPasswDTO(
        id=user_dao.id,
        username=user_dao.username,
        email=user_dao.email,
    )

@app.post("/users/login", response_model=JWTDTO)
def log_in(l: LoginDTO, res: Response, db = Depends(get_db)):
    user_dao = db.query(UserDAO).filter(UserDAO.email == l.login).first()
    if not user_dao:
        user_dao = db.query(UserDAO).filter(UserDAO.username == l.login).first()
    if not user_dao or user_dao.password != l.password:
        raise HTTPException(
            status_code=401,
            detail="Wrong login or password",
        )
    jwt = str(user_dao.id)
    res.set_cookie(key="jwt", value=jwt, expires=3600 * 24)
    return JWTDTO(jwt=jwt)

@app.post("/tierlists", response_model=TierlistDTO)
def create_tierlist(tl: CreateTierlistDTO, req: Request, db = Depends(get_db)):
    uid = int(req.cookies.get("jwt"))
    tiers_dao = []
    for t in tl.tiers:
        images_dao = []
        for i in t.images:
            images_dao.append(ImageDAO(
                path = i.path
            ))
        tiers_dao.append(TierDAO(
            name = t.name,
            images = images_dao
        ))
    tl_dao = TierlistDAO(
        name = tl.name,
        owner_id = uid,
        is_template = True,
        tiers = tiers_dao
    )
    db.add(tl_dao)
    db.commit()
    db.refresh(tl_dao)

    tiers_dto = []
    for t in tl_dao.tiers:
        images_dto = []
        for i in t.images:
            images_dto.append(ImageDTO(
                id = i.id,
                path = i.path,
                tier_id = t.id
            ))
        tiers_dto.append(TierDTO(
            id = t.id,
            name = t.name,
            tierlist_id = t.tierlist_id,
            images = images_dto
        ))
    return TierlistDTO(
        id = tl_dao.id,
        name = tl_dao.name,
        owner_id = tl_dao.owner_id,
        is_template = tl_dao.is_template,
        tiers = tiers_dto
    )

#@app.post("/tierlists/{tierlist_id}", tierlist_id: int, response_model=TierlistDTO)
#def add_tierlists(tl: TierlistsDTO, req: Request, db = Depends(get_db)):
#    uid = int(req.cookies.get("jwt"))
#    tl_dao = TierlistDAO(
#        name = tl.name,
#        owner_id = uid,
#        is_template = True
#    )
#    db.add(tl_dao)
#    db.commit()
#    db.refresh(tl_dao)
#    return TierlistDTO(
#        id=tl_dao.id,
#        name=tl_dao.name,
#        owner_id=tl_dao.owner_id,
#        tiers=[]
#        #tiers=tl_dao.tiers,
#    )
