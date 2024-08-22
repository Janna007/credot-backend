import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";
import {verifyJWT} from '../middlewares/authMiddleware.js'
import {isAdmin} from '../middlewares/adminMiddleware.js'


const router=Router()
router.route("/create").post(verifyJWT,isAdmin,createProduct)
router.route("/getproducts").get(verifyJWT,getAllProducts)
router.route("/getproduct/:id").get(verifyJWT,getProductById)
router.route("/update/:id").put(verifyJWT,isAdmin,updateProduct)
router.route("/delete/:id").delete(verifyJWT,isAdmin,deleteProduct)


export default router