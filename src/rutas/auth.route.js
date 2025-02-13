import express from "express";
import { loginControler, registerControler, verifyEmailControler } from "../controladores/auth.controler.js";


const authRouter = express.Router();

authRouter.post("/register", registerControler)
authRouter.post("/login", loginControler)
authRouter.get("/verify-email", verifyEmailControler)

export default authRouter