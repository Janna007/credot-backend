import { Router } from "express";

import {verifyJWT} from '../middlewares/authMiddleware.js'
import {isAdmin} from '../middlewares/adminMiddleware.js'
import { addToCart, getCartItems, removeFromCart, updateCartItem } from "../controllers/cartControllers.js";



const router=Router()

router.use(verifyJWT)

router.route("/add").post(addToCart)
router.route("/update").put(updateCartItem)
router.route("/delete").delete(removeFromCart)
router.route("/getcartitems").get(getCartItems)


export default router