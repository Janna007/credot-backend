import { Product } from "../models/product.model.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from "../models/user.model.js"
import mongoose from "mongoose"

//add to cart

const addToCart=asyncHandler(async(req,res,next)=>{
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, 'Invalid product ID');
      }

      if (quantity <= 0) {
        throw new ApiError(400, 'Quantity must be greater than zero');
      }

      const product = await Product.findById(productId);

      if (!product) {
        throw new ApiError(404, 'Product not found');
      }

      const user = await User.findById(userId);
      
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (cartItemIndex > -1) {
        // If the product is already in the cart, update the quantity
        user.cart[cartItemIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        user.cart.push({ product: productId, quantity });
      }
      
       // Save the updated user
  await user.save();

  return res.status(200).json(new ApiResponse(200, user.cart, 'Product added to cart'));

})


//update cart

const updateCartItem = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, 'Invalid product ID');
  }

  if (quantity <= 0) {
    throw new ApiError(400, 'Quantity must be greater than zero');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

  if (cartItemIndex === -1) {
    throw new ApiError(404, 'Product not found in cart');
  }

  user.cart[cartItemIndex].quantity = quantity;

  await user.save();

  return res.status(200).json(new ApiResponse(200, user.cart, 'Cart updated successfully'));
});

//remove from cart

const removeFromCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, 'Invalid product ID');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.cart = user.cart.filter(item => item.product.toString() !== productId);

  await user.save();

  return res.status(200).json(new ApiResponse(200, user.cart, 'Product removed from cart'));
});


const getCartItems = asyncHandler(async (req, res) => {
  // Assume `req.user` contains the logged-in user's information
  const userId = req.user._id;

  // Find the user and populate the cart with product details
  const user = await User.findById(userId).populate('cart.product');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Return the cart items
  return res.status(200).json({ success: true, data: user.cart });
});



export {addToCart,updateCartItem,removeFromCart,getCartItems}