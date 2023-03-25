export const asyncHandler =(fn)=>{
    return(req,res,next)=>{
         fn(req,res,next).catch(err=>{
            return next(new Error(err,{cause:500}))
         })
    }
}

export const globalError = (err,req,res,next)=>{
        if (err) {  
            if (process.env.Mood == "DEV") {
                return  res.status(err.cause || 500).json({message:err.message,err,stack:err.stack})
                
            }
        return res.status(err.cause || 500).json({message:err.message})
        
        }
}