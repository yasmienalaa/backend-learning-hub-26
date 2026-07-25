import { Router } from "express";
import {signIn,signUp,signOut,profile,adminOnly} from "../controller/usersController"
import { auth,author } from "../middleware/auth";

const routes=Router();

routes.post("/signIn",signIn)
routes.post("/signUp",signUp)
routes.get("/signOut",signOut)
routes.get("/profile",auth,profile)
routes.get("/admin-only",auth,author,adminOnly)

export{routes}