from fastapi import Request, HTTPException

def get_uid(req: Request):
    uid = req.headers.get("authorization")
    if not uid or not uid.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No JWT provided")
    if uid is None:
        uid = req.cookies.get("jwt")
    uid = uid[len("Bearer "):]
    return int(uid)
