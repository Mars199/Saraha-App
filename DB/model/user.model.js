import  { model, Schema } from "mongoose";


const userSchema = new Schema({
    userName :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },
    age:Number,
    gender:{
        type:String,
        default:'male',
        enum:['male' , 'female']
    },confirmEmail:{
        type:Boolean,
        default:false
    },status:{
        type:String,
        default:'offline',
        enum:['offline' , 'online' , 'blocked']
    },role:{
        type:String,
        default:'User',
        enum:['User' , 'Admin']
    }
},{
    timestamps:true
})

const userModel = model('User' , userSchema)
export default userModel