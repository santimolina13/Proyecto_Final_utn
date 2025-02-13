import express from "express";
import { getContactsControler, inviteContactsControler } from "../controladores/contacts.controler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const contactsRouter = express.Router();
    contactsRouter.use(authMiddleware)

    contactsRouter.post("/invite",inviteContactsControler)// para invitar a un contacto
    contactsRouter.get("/",getContactsControler)//lista de contactos de un usuario
    

export default contactsRouter