const dateMethod =['body' , 'query' , 'params','Headers' ]
const validation = (schema)=>{
     return(req,res,next)=>{
        const validationArr = []
        
    
       dateMethod.forEach(key => {
        if (schema[key]) {
            const validationResult = schema[key].validate(req[key] ,{abortEarly:false})
            if (validationResult.error) {
                validationArr.push(validationResult.error.details)   
            }
        }
        
       });
       if (validationArr.length > 0) {
            return res.json({message:"validation error" ,validationArr})    
        }
        else{
            return next()
        }     
     }
}
export default validation 