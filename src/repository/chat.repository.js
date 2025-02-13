import Chat from "../models/chats.model.js"



class ChatRepository{    

async createChat({userId,contactId}){

    const newChat=  new Chat(
        {
            members:[userId,contactId]
        })


        return await newChat.save()

}

async getAllChatUser(userId){

    const allChatUser=  await Chat.find({members:userId})

    return  allChatUser

}
async findByChatId(chatId){
    const chat_found=await Chat.findById(chatId)
    return chat_found
}
async findChatByContactId(userId, contactId) {
    const chat_found = await Chat.findOne({
        members: { $all: [userId, contactId] }
    }).populate("members","username")
    console.log("ESTE",chat_found)
    return chat_found;
}
}

export default new ChatRepository()