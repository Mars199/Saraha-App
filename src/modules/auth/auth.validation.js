import joi from 'joi'

export const signUpSchema = {
    body:joi.object({
        userName:joi.string().alphanum().required(),
        email:joi.string().email({minDomainSegments:2 , maxDomainSegments:3 , tlds:{allow:['com' , 'net' ,'edu']}}).required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword:joi.ref("password")
    }).required()
}


export const logInSchema = {
    body:joi.object({
        email:joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    }).required()
}