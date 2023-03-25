import userRouter from './modules/user/user.router.js'
import authRouter from './modules/auth/auth.router.js'
import messageRouter from './modules/message/message.router.js'
import connectDB from '../DB/connection.js'
import { globalError } from './utils/errorHandling.js'
//import sendEmail from './utils/SendEmail.js'



const initApp = (app , express)=>{

    connectDB()
    //sendEmail()

    app.use(express.json({}))
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use("/user" , userRouter)
    app.use("/auth" , authRouter)
    app.use("/message" , messageRouter)
    app.use("*" , (req,res,next)=>{
        return res.json({message:"404 Page not found"})
    })
     app.use(globalError)



}

export default initApp