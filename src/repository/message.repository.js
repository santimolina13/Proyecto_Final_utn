import Messages from "../models/message.model.js"
import chatRepository from "./chat.repository.js"
import UserRepository from "./user.repository.js"


class MessageRepository{
    
    
    
    async newMessage ({chatId,content,userId}){
        const user= await chatRepository.findByChatId(chatId)
        console.log( "user message repository l 12 ",user)
        const newMessage= await new Messages({
            chat:chatId,
        content:content,
        sender:userId})
        .populate("sender","username email")
        user.messages.push(newMessage)
        user.save()
        const newMessagemodified= await chatRepository.findByChatId(chatId)
        console.log(newMessagemodified)
        
        return(
        await newMessage.save()
        
        

    )   
        

    }
    async getAllMessageChat(chatId){
        const allMessageChat= await Messages.find({chat:chatId}).populate("sender","username")
        
        return allMessageChat
    }

    async getMessageBysender(senderId){
        const allMessageChat= await Messages.find({sender:senderId}).populate("chat")
        console.log( allMessageChat)
        return allMessageChat
    }
}

export default new MessageRepository()