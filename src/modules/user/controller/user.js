import userModel from '../../../../DB/model/user.model.js'
import cloudinary from '../../../utils/cloudinary.js';
import { asyncHandler } from "../../../utils/errorHandling.js";
import { generateToken } from "../../../utils/genarateANDverify.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";
export const profile = asyncHandler (async(req,res,next)=>{
    const user = await userModel.findById(req.user._id)
    return res.json({message:"Done",user})
})

export const profilePic =asyncHandler(async(req,res,next)=>{
    const {userName} = req.body
    console.log({userName});
    if (!req.file) {
        return next(new Error('file is required ', {cause:400}))
        
    }
    const cloud = await cloudinary.uploader.upload(req.file.path,{folder :`user/${req.user._id}/profile`})
    //const user = await userModel.findByIdAndUpdate(req.user._id , {profilePic : req.file.dest} , {new : true})
    return res.json ({message:"Done" , cloud})

})
export const updatePassword =asyncHandler(async(req ,res ,next )=>{
    const { oldPassword , newPassword} = req.body 
    console.log({oldPassword , newPassword});
    const user = await userModel.findById(req.user._id)
    const match = compare({plaintext:oldPassword , hashValue:user.password})
    if(!match){
        return next(new Error('In - valid old password', {cause:400}))
    }
    const hashPassword = hash({plaintext:newPassword})
    user.password=hashPassword;
    await user.save()
    return res.status(200).json({message:"Done"})
}) 




export const shareProfile = asyncHandler(async(req, res,next )=>{
    const user = await userModel.findById(req.params.id).select('userName email profilePic')
    if (!user) {
        return user? res.status(200).json ({message:"Done" , user}):next(new Error("In - valid account Id " , {cause : 404 }))
        
    }

})