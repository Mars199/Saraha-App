import { Router } from "express";
import auth from "../../middleWare/auth.middleWare.js";
import * as userController from './controller/user.js'
import validation from "../../middleWare/validation.js"
import * as validators from './user. validation.js'
import {fileUpload,fileValidation} from '../../utils/cloudMulter.js'
const router = Router()
router.patch("/profilePic" , 
auth,
fileUpload(fileValidation.image).single('image'),
userController.profilePic)

router.get("/profile",auth, userController.profile )
router.patch("/password" , validation(validators.updatePassword),auth , userController.updatePassword)
router.get("/:id/profile" ,validation(validators.shareProfile),  userController.shareProfile)
export default router