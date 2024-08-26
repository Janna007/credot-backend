import { registerSchema} from '../schemas/authSchemas.js'
import { createOrderSchema } from '../schemas/orderSchemas.js';
import { ApiError } from '../utils/ApiError.js';
import { createProductSchema,updateProductSchema } from '../schemas/productSchemas.js';
import { asyncHandler } from '../utils/AsyncHandler.js';


export const validateRegister= asyncHandler(
   async(req,res,next)=>{
      const { error } = registerSchema.validate(req.body);
       if(error) {
          throw new ApiError(400,"Validation Error")
       }
       next()
  }
) 

export const validateOrder=  asyncHandler(
   async(req,res,next)=>{
      const { error } = createOrderSchema.validate(req.body);
       if(error) {
          throw new ApiError(400,"Validation Error")
       }
       next()
  }
) 

export const validateProduct= asyncHandler(
   async(req,res,next)=>{
      const { error } = req.method === 'POST' 
      ? createProductSchema.validate(req.body)
      : updateProductSchema.validate(req.body);
       if(error) {
          throw new ApiError(400,"Validation Error")
       }
       next()
  }
  
) 


