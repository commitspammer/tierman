import shutil
from fastapi import FastAPI, Depends, HTTPException, Request, Response, File, UploadFile, Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Union, Optional, List
from .auth import get_uid
from .database import init_tables, get_db
from .dao import UserDAO, TierlistDAO, TierDAO, ImageDAO, ImageAssociationsDAO
from .dto import CreateUserDTO, UserNoPasswDTO, LoginDTO, JWTDTO, UploadedImagesDTO
from .dto import CreateTierlistDTO, CreateTierDTO, CreateImageDTO, TierlistDTO, TierDTO, ImageDTO, TierlistAllDTO
from sqlalchemy.orm import joinedload
import random

init_tables()

app = FastAPI()
app.mount("/public", StaticFiles(directory="public"), name="public")
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
    uid = get_uid(req)
    tiers_dao = []
    image_assocs_dao = []
    tl_dao = TierlistDAO(
        name = tl.name,
        owner_id = uid,
        is_template = True,
        tiers = tiers_dao,
        image_assocs = image_assocs_dao
    )
    for i in tl.images:
        image_assocs_dao.append(ImageAssociationsDAO(
            image = ImageDAO(
                path = i.path
            ),
            tierlist = tl_dao
        ))
    for t in tl.tiers:
        tiers_dao.append(TierDAO(
            name = t.name,
            color = t.color,
            tierlist = tl_dao,
        ))
    db.add(tl_dao)
    db.commit()
    db.refresh(tl_dao)

    tiers_dto: List[TierDTO] = []
    bag: List[ImageDTO] = []
    for t in tl_dao.tiers:
        tiers_dto.append(TierDTO(
            id = t.id,
            name = t.name,
            color = t.color,
            tierlist_id = t.tierlist_id,
            images = []
        ))
    for ia in tl_dao.image_assocs:
        if ia.tierlist_id != tl_dao.id:
            continue
        i = ia.image
        if ia.tier_id is None:
            bag.append(ImageDTO(
                id = i.id,
                path = i.path,
                tier_id = None,
                tierlist_id = tl_dao.id
            ))
            continue
        for t in tiers_dto:
            if t.id == ia.tier_id:
                t.images.append(ImageDTO(
                    id = i.id,
                    path = i.path,
                    tier_id = t.id,
                    tierlist_id = tl_dao.id
                ))
                break
    return TierlistDTO(
        id = tl_dao.id,
        name = tl_dao.name,
        owner_id = tl_dao.owner_id,
        is_template = tl_dao.is_template,
        tiers = tiers_dto,
        bag = bag
    )

@app.get("/tierlists", response_model=List[TierlistAllDTO])
def list_tierlists(req: Request, db = Depends(get_db)):
    tl_dao_list = db.query(TierlistDAO)\
        .options(joinedload(TierlistDAO.image_assocs).joinedload(ImageAssociationsDAO.image))\
        .order_by(TierlistDAO.id.desc())\
        .all()

    result = []
    for tl in tl_dao_list:
        imagens = [ia.image for ia in tl.image_assocs if ia.tierlist_id == tl.id]
        capa = random.choice(imagens) if imagens else None
        capa_path = capa.path if capa else None

        result.append(
            TierlistAllDTO(
                id=tl.id,
                name=tl.name,
                owner_id=tl.owner_id,
                is_template=tl.is_template,
                cover_image_path=capa_path
            )
        )

    return result

@app.get("/tierlists/{id}", response_model=TierlistDTO)
def get_tierlist_by_id(
    id: int = Path(..., description="Tierlist ID"),
    db = Depends(get_db)
):
    tl_dao = db.query(TierlistDAO)\
        .options(
            joinedload(TierlistDAO.tiers),
            joinedload(TierlistDAO.image_assocs).joinedload(ImageAssociationsDAO.image)
        )\
        .filter(TierlistDAO.id == id)\
        .first()

    if not tl_dao:
        raise HTTPException(status_code=404, detail="Tierlist not found")

    tiers_dto: List[TierDTO] = []
    bag: List[ImageDTO] = []

    for t in tl_dao.tiers:
        tiers_dto.append(TierDTO(
            id=t.id,
            name=t.name,
            color=t.color,
            tierlist_id=t.tierlist_id,
            images=[]
        ))

    for ia in tl_dao.image_assocs:
        i = ia.image
        if ia.tier_id is None:
            bag.append(ImageDTO(
                id=i.id,
                path=i.path,
                tier_id=None,
                tierlist_id=tl_dao.id
            ))
            continue

        for t in tiers_dto:
            if t.id == ia.tier_id:
                t.images.append(ImageDTO(
                    id=i.id,
                    path=i.path,
                    tier_id=t.id,
                    tierlist_id=tl_dao.id
                ))
                break

    return TierlistDTO(
        id=tl_dao.id,
        name=tl_dao.name,
        owner_id=tl_dao.owner_id,
        is_template=tl_dao.is_template,
        tiers=tiers_dto,
        bag=bag
    )

@app.post("/images")
def upload_images(files: List[UploadFile] = File(...)):
    paths = []
    for f in files:
        file_path = f"public/{f.filename}"
        with open(file_path, "wb+") as file_obj:
            shutil.copyfileobj(f.file, file_obj)
            paths.append(file_path)
    return UploadedImagesDTO(
        paths = paths
    )
