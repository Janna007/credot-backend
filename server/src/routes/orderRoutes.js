import { Router } from "express";

import {verifyJWT} from '../middlewares/authMiddleware.js'
import {isAdmin} from '../middlewares/adminMiddleware.js'
import { createOrder, getAllOrders, getOrderById, getUserOrders, updateOrderStatus } from "../controllers/orderController.js";
import { validateOrder } from "../middlewares/validationMiddleware.js";


const router=Router()

router.route("/create").post(verifyJWT,validateOrder,createOrder)
router.route("/getorder/:id").get(verifyJWT,getOrderById)
router.route("/userorder").get(verifyJWT,getUserOrders)
router.route("/update/:id").post(verifyJWT,isAdmin,updateOrderStatus)
router.route("/all").get(verifyJWT,isAdmin,getAllOrders)

export default router

