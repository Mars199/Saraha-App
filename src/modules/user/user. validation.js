import  joi from 'joi'
export const updatePassword = {
    body:joi.object({
        oldPassword:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        newPassword:joi.string().invalid(joi.ref('oldPassword')).pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword:joi.string().valid(joi.ref("newPassword")).required()
    }).required()
}

export const shareProfile = {
    params:joi.object({
        id:joi.string().min(24).max(24).required()
    }).required()
}