
import { Product } from "../models/product.model.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from "../models/user.model.js"
import { Order } from "../models/order.model.js"
//create product--admin

const createProduct=asyncHandler(async(req,res,next)=>{
    
     const {name,description,price,category}=req.body

     if ([name,description,category].some((field)=>field?.trim() === "")) {
        throw new ApiError(400,"All field is are  required!!!")
      }

     
     if (isNaN(price) || Number(price) <= 0) {
        throw new ApiError(400, "Price must be a valid positive number");
      }

     const product=new Product({name,description,price,category})  
     const createdProduct= await product.save()

     

     if(!createdProduct){
        throw new ApiError(500,"Something Went Wrong")
     }

     return res.status(201).json(
        new ApiResponse(201, createdProduct, "Product Created Successfully") 
    ) 

})


//get products

const getAllProducts=asyncHandler(async(req,res,next)=>{
    // Fetch all products from the database
      const products = await Product.find();

      // Check if products are found
      if (!products || products.length === 0) {
         return res.status(404).json(
            new ApiResponse(404, null, "No products found")
         );
      }

      // Return the products
      return res.status(200).json(
         new ApiResponse(200, products, "Products fetched successfully")
      );
})


//get product by id 

const getProductById=asyncHandler(async(req,res,next)=>{
   const { id } = req.params;

   const product = await Product.findById(id);

   if (!product) {
      throw new ApiError(404, "Product not found");
    }


    return res.status(200).json(
      new ApiResponse(200, product, "Product fetched successfully")
    );
})


//update products---admin

const updateProduct=asyncHandler(async(req,res,next)=>{
   const { id } = req.params;
   const { name, description, price, category } = req.body;

   const product = await Product.findById(id);

   if (!product) {
     throw new ApiError(404, "Product not found");
   }

   product.name = name || product.name;
   product.description = description || product.description;
   product.price = price || product.price;
   product.category = category || product.category;

   const updatedProduct = await product.save();

   if(!updateProduct){
      throw new ApiError(500,"Something went wrong while updating products")
   }


  return res.status(200).json(
   new ApiResponse(200, updatedProduct, "Product updated successfully")
 );
})


//delete product ----admin


const deleteProduct=asyncHandler(async(req,res,next)=>{
   const { id } = req.params;

  
   const product = await Product.findById(id);
 
 
   if (!product) {
     throw new ApiError(404, "Product not found");
   }
 

    await Product.findByIdAndDelete(product._id)

    await User.updateMany(
      { 'cart.product': id },
      { $pull: { cart: { product: id } } }
    );
  
    // 5. Remove the product from all orders
    await Order.updateMany(
      { 'products.product': id },
      { $pull: { products: { product: id } } }
    );
  

   return res.status(200).json(
     new ApiResponse(200, null, "Product deleted successfully")
   );
})


export {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct}