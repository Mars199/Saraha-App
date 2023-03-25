import { Router } from "express";
import * as messageController from './controller/message.js'
import validation from "../../middleWare/validation.js";
import auth from "../../middleWare/auth.middleWare.js"
import * as validators from './message.validation.js'
const router = Router()

router.get("/",auth, messageController.getMessageModule )
router.post("/:receiverId",validation(validators.sendMessage) ,messageController.sendMessage)
router.delete("/:id" , auth,validation(validators.DeleteMessage), messageController.DeleteMessage)
export default router  