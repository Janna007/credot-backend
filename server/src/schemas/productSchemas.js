import Joi from 'joi'

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().greater(0).required(),
  category: Joi.string().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3),
  description: Joi.string().min(10),
  price: Joi.number().greater(0),
  category: Joi.string(),
}).min(1); // At least one field is required for update

