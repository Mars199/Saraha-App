import userModel from '../../../../DB/model/user.model.js'
import { asyncHandler } from "../../../utils/errorHandling.js";
import messageModel from '../../../../DB/model/message.model.js'


  


export const getMessageModule =asyncHandler(async (req,res,next)=>{
    const messages = await messageModel.find({receiverId:req.user._id})
    return res.json({message:"Done " ,messages})
}) 


export const sendMessage = asyncHandler(async (req,res,next)=>{
    const { receiverId } = req.params
    const {message} = req.body
    const user = await userModel.findById(receiverId)
    if (!user) {
        return next(new Error("In-valid accountID" , {cause:404}))
    }
    const createMessage = await messageModel.create({receiverId : user._id , message})
            return res.status(201).json({message:"Done" , createMessage})

}) 

export const DeleteMessage = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const message = await messageModel.deleteOne({_id:id, receiverId : req.user._id})
    return message.deletedCount? res.status(200).json({message:"Done"}) :next(new Error("In - valid message id " ,{cause:400}))
})