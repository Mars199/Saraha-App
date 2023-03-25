import mongoose, { model, Schema, Types } from "mongoose";


const messageSchema = new Schema({
    message :{
        type:String,
        required:true
    },
    receiverId:{
        type:Types.ObjectId ,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const messageModel =mongoose.models.Message|| model('Message' , messageSchema)
export default messageModel