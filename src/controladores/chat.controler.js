
import Chat from "../models/chats.model.js"
import Messages from "../models/message.model.js"

import ChatRepository from "../repository/chat.repository.js"
import MessageRepository from "../repository/message.repository.js"
import UserRepository from "../repository/user.repository.js"




 export const getChatsContactControler=async (req,res)=>{
    try{
        const {id}=req.user
        const {contactId}=req.params
        
        if (id === contactId) {
            return res.status(400).json({ message: "No puedes chatear contigo mismo" });
        }

        // Verificamos si el contactId es un usuario válido
        const contactExists = await UserRepository.findById(contactId);
        if (!contactExists) {
            return res.status(404).json({ message: "El usuario no existe" });
        }

        // Buscamos si ya existe un chat entre ambos usuarios
        let chat = await ChatRepository.findChatByContactId(id, contactId);

        // Si el chat no existe, lo creamos
        if (!chat) {
            chat = await ChatRepository.createChat({userId:id,contactId});
            await chat.save();
        }
        return res.json({
            ok: true,
            status:201,
            message: 'chat encontrado',
            data: {
                chat
            }
        })
        

        
    }
    catch(error){
        console.error(error)
        res.json(
            {
                ok:false,
                status:500,
                message:"error obtener chats"        
            })
    }
}

export const NewChatsControler = async (req, res) => {
    try{
        const {userId, contactId}=req.params
        const newChat=  await ChatRepository.createChat({userId,contactId})
            console.log(newChat)
            return res.json({
                ok: true,
                status:201,
                message: 'chat creado correctamente',
                data: {
                    newChat
                }
            })
        }
    catch(error){
        console.error(error)
        res.json({
            ok:false,
            status:500,
            message:"error crear chat"
        })
    }
}


export const getChatsControler = async (req, res) => {    
    try{
        const {userId}=req.params
        const allChatUser= await ChatRepository.getAllChatUser(userId)
        return res.json({
            ok: true,
            status:201,
            message: 'lista de chats',
            data: {
                allChatUser
            }
        })
    }
    catch(error){
        console.error(error)
        res.json(
            {
                ok:false,
                status:500,
                message:"error obtener chats"        
            })
    }
    }


    export const sendMessage = async (req,res)=>{
        try{
            const {chatId}=req.params
            const {content}=req.body
            const {id}=req.user

            /* const {_id}= req.user
            console.log(_id) */

            const newMessage= await MessageRepository.newMessage({chatId,content,userId:id})
                
            return res.json({
                ok: true,
                status:201,
                message: 'mensaje enviado',
                data: {
                    new_message:newMessage.content
                }
            })
        }
        catch(error){
            console.error(error)
            res.json(
                {
                    ok:false,
                    status:500,
                    message:"error al enviar mensaje "        
                })
        }

    }



    export const getMessagesControler = async (req, res) => {    
        try{
            const {chatId}=req.params
            console.log("chatId desde controler",chatId)
            const allMessageChat= await MessageRepository.getAllMessageChat(chatId)
            console.log(allMessageChat)
            return res.json({
                ok: true,
                status:201,
                message: 'lista de mensajes',
                data: {
                    allMessageChat
                }
            })
        }
        catch(error){
            console.error(error)
            res.json(
                {
                    ok:false,
                    status:500,
                    message:"error obtener mensajes"        
                })
        }
        }