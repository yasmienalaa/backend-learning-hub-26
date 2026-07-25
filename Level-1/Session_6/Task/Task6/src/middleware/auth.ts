import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"


const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" })
    }
    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY as string)
        if (!verify) {
            return res.status(401).json({ msg: "unauthorized" })
        }
        next();
    } catch {
        return res.status(401).json({ msg: "Invalid token" })
    }
}

const author=(req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" })
    }
    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY as string) as {id:number,role:string}
        if (verify.role!="admin") {
            return res.status(403).json({ msg: "you are not an admin" })
        }
        next();
    } catch {
        return res.status(401).json({ msg: "Invalid token" })
    }
}

export {auth,author}