import mongoose from "mongoose"



const MessagesSchema = new mongoose.Schema({
    chat:{type: mongoose.Schema.Types.ObjectId,
        ref:'Chat',
        require:true
    },
    sender:{type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    content:{type:String,require:true},
    createAt:{type: Date, default: Date.now},
    modifiedAt:{type: Date, default: Date.now}

})
const Messages=mongoose.model('Messages',MessagesSchema)


export default Messages