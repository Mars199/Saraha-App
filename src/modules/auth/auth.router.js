import { Router } from "express";
import validation from "../../middleWare/validation.js";
import * as authController from './controller/auth.js'
import * as validators from './auth.validation.js'
const router = Router()

router.get("/", authController.getAuthModule )
router.post("/signup" ,validation(validators.signUpSchema), authController.SignUP)
router.post("/login" ,validation(validators.logInSchema), authController.logIn)
router.get("/newConfirmEmail/:token" , authController.confirmEmail)
export default router