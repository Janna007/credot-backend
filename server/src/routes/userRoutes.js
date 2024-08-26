import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { validateRegister } from "../middlewares/validationMiddleware.js";


const router=Router()

router.route("/register").post( validateRegister,registerUser)
router.route("/login").post(validateRegister,loginUser)

export default router