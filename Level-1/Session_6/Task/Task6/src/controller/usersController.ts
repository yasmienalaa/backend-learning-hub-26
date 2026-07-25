import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user, users } from "../data/user"
import { error } from "node:console";

const createToken = (id: number, role: String) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY as string, { expiresIn: 60 * 60 })
}

const signUp = async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "sign up failed" })
        }
        const userExist = users.find(u => u.email === email);
        if (userExist) {
            return res.status(400).json({ message: "email already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: user = {
            id: users.length + 1,
            userName: userName,
            email: email,
            password: hashedPassword,
            role: "user"
        }
        users.push(newUser);

        res.status(201).json({ status: 201, data: newUser });
    } catch {
        res.status(500).json({ error })
    }

}

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "log in failed" })
        }
        const userExist = users.find(u => u.email === email);
        if (!userExist) {
            return res.status(400).json({ msg: "invalid username or password" });
        }
        const truePassword = await bcrypt.compare(password, userExist.password);
        if (!truePassword) {
            return res.status(400).json({ msg: "invalid username or password" });
        }
        const token = createToken(userExist.id, userExist.role);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        });
        res.status(200).json({ userExist })
    } catch {
        res.status(500).json({ error })
    }


}

const signOut = (req: Request, res: Response)=>{
    res.clearCookie("token");
    res.status(200).json({msg: "Logged out successfully"})
}

const profile=(req:Request,res:Response)=>{
    res.status(200).json({msg:"you are authenticated"});
}

const adminOnly=(req:Request,res:Response)=>{
    res.status(200).json({msg:"welcome admin"});
}

export {signIn,signUp,signOut,profile,adminOnly}