from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union, Optional
from .database import init_tables, get_db
from .dao import UserDAO, TierlistDAO
from .dto import CreateUserDTO, UserNoPasswDTO, LoginDTO, JWTDTO, CreateTierlistDTO, TierlistDTO

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
    tl_dao = TierlistDAO(
        name = tl.name,
        owner_id = uid,
        is_template = True
    )
    db.add(tl_dao)
    db.commit()
    db.refresh(tl_dao)
    return TierlistDTO(
        id=tl_dao.id,
        name=tl_dao.name,
        owner_id=tl_dao.owner_id,
        tiers=[]
        #tiers=tl_dao.tiers,
    )
