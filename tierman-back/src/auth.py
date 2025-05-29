from fastapi import Request, HTTPException

def get_uid(req: Request):
    uid = req.headers.get("Authorization: Bearer")
    if uid is None:
        uid = req.cookies.get("jwt")
    if uid is None:
        raise HTTPException(status_code=400, detail="No JWT provided")
    return int(uid)
