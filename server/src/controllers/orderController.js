import { Product } from "../models/product.model.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { Order } from "../models/order.model.js"
import { User } from "../models/user.model.js"

// get all orders(get) ---admin


//place order(post)

const createOrder=asyncHandler(async(req,res,next)=>{
    const { products, totalPrice } = req.body;

  
  if (!products || !totalPrice) {
    throw new ApiError(400, "Products and total price are required");
  }

  const order = new Order({
    user: req.user._id,
    products,
    totalPrice,
  });

  const savedOrder = await order.save();
  if(!savedOrder){
    throw new ApiError(500,"Something Went wrong!!!")
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

 
  user.cart = [];
  await user.save();


  res.status(201).json(
    new ApiResponse(201, savedOrder, "Order placed successfully")
  );


})

//to get user orders ---

const getUserOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }).populate("products.product")

    if (orders.length === 0) {
        return res.status(404).json(
          new ApiResponse(404, null, "No orders found for this user")
        );
      }
  
    res.status(200).json(
      new ApiResponse(200, orders, "User orders fetched successfully")
    );
  });

//to get order by id 

const getOrderById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const order = await Order.findById(id);
  
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
  
    res.status(200).json(
      new ApiResponse(200, order, "Order fetched successfully")
    );
  });




//update order status (put) ---admin

const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
  
  
    if (!status || !['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      throw new ApiError(400, "Invalid status");
    }
  
    const order = await Order.findById(id);
  
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
  
    order.status = status;
  
    const updatedOrder = await order.save();
  
    res.status(200).json(
      new ApiResponse(200, updatedOrder, "Order status updated successfully")
    );
  });
  

export {createOrder,getUserOrders,getOrderById,updateOrderStatus}