import mongoose from "mongoose"
import  dotenv from 'dotenv';
dotenv.config();
const connectDB = async()=>{
        console.log(process.env.DB_LOCAL);
    return await mongoose.connect(process.env.DB_LOCAL).then(result =>{
        console.log(`DB connected successfully ....  :) `);
    }).catch(err =>{
        console.log(`Fail to connect DB ......:(${err}`);
    })

}
export default connectDB