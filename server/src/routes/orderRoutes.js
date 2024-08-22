import { Router } from "express";

import {verifyJWT} from '../middlewares/authMiddleware.js'
import {isAdmin} from '../middlewares/adminMiddleware.js'
import { createOrder, getOrderById, getUserOrders, updateOrderStatus } from "../controllers/orderController.js";


const router=Router()

router.route("/create").post(verifyJWT,createOrder)
router.route("/getorder/:id").get(verifyJWT,getOrderById)
router.route("/userorder").get(verifyJWT,getUserOrders)
router.route("/update/:id").post(verifyJWT,isAdmin,updateOrderStatus)

export default router

