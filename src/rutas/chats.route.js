import express from "express";
import {  getMessagesControler,  sendMessage , getChatsContactControler} from "../controladores/chat.controler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const chatsRouter = express.Router();
    chatsRouter.use(authMiddleware)
    
    
    chatsRouter.post("/:contactId",getChatsContactControler)// inicia y/o devuelve el cont con el usuaria que tiene ese contactId(que es el id de usuario)
    chatsRouter.post("/:chatId/sendMessage",sendMessage)//para enviar un mensaje
    chatsRouter.get("/:chatId",getMessagesControler)//para obtener los mensajes de un chat


export default chatsRouter

    
    //chatsRouter.get("/:userId",getChatsControler)//para obtener los chats de un usuario 