import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({

    members:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true 
            }], // Usuarios en el chat

    createAt: { type: Date, default: Date.now },
    messages: [
        {
        type: mongoose.Schema.Types.ObjectId,
           ref: "Messages", // Referencia a los mensajes del chat
        },],
    modifiedAt: { type: Date, default: Date.now }
})

    const Chat = mongoose.model('Chat', chatSchema)


export default Chat