import userModel from '../../DB/model/user.model.js';
import {verifyToken} from '.././utils/genarateANDverify.js'
import jwt from 'jsonwebtoken'
const auth = async(req,res, next )=>{
   try {
     const {authorization} = req.headers;
    console.log({authorization });
    if(!authorization  ){
        return res.json ({message:"authorization is required "})
    }
    if (!authorization.startsWith(process.env.BEARER_KEY)){
        return res.json({message:"In-valid bearer Key"})
    }
    const token = authorization.split(process.env.BEARER_KEY)[1]
    console.log({token});
    if (!token) {
        return res.json({message:"In-valid token"})
        
    }
    const decoded = verifyToken({
        token,
    }) 
    if(!decoded?.id){
        return res.json({message:"In -valid token payload " })

    }
    console.log({decoded});
    const authUser = await userModel.findById(decoded.id).select('userName email status role')

    if (!authUser){
            return res.json({message:"not register account"})
    } 
    req.user = authUser
    return next()
        
   } catch (error) {
    return res.json({message:"Catch Error" , error})
   }
    
}
export default auth