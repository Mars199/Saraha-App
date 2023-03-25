import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { generateToken } from "../../../utils/genarateANDverify.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";
//import sendEmail from '../../..//utils/SendEmail.js'
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
export const getAuthModule = (req,res,next)=>{
    return res.json({message:"HELLO AUTH "})
}

export const SignUP =asyncHandler(async(req,res,next)=>{
  
        const {userName,email, password , cPassword}= req.body
        console.log({userName,email , password , cPassword});
        const user =await userModel.findOne({email})
        if (user) {
            return next(new Error('Email exist' , {cause:StatusCodes.CONFLICT}))
        }
        
        const hashPassword = hash({plaintext:password})
        const CreateUser = await userModel.create({userName , email , password : hashPassword})
        return res.status(201).json({message:"Done" , user:CreateUser._id})

}) 

export const logIn = asyncHandler(async(req, res, next)=>{
        const {email , password}= req.body
        const user = await userModel.findOne({email})
        if (!user) {
            return next(new Error("Email Not Exist" , { cause:404})) 
        }
        console.log({FE:password , DB: user.password});
        const match = compare({plaintext:password , hashValue:user.password})
        console.log({match});
        if(!match){
            return next(new Error('IN- valid password')) 
        }
        const access_Token = generateToken({
            payload:{id:user._id,isLoggedIn:true,role:user.role}
        })
        user.status = "online";
        await user.save()
        return res.status(200).json({message:"Done" ,access_Token})

}) 


export  const confirmEmail = asyncHandler(async(req, res,next)=>{
    const {token} = req.params
    const {decoded} = verfiyToken({token , signature:process.env.TOKEN_SIGNATURE})
    console.log(decoded);
    const user = await userModel.updateOne({email:email},{confirmEmail:true})
    return user.modifiedCount?res.json({message:"confirm email success "}) :res.json({message:"fail"})
}) 


