import Joi from 'joi';

export const createOrderSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().greater(0).required(),
    })
  ).required(),
  totalPrice: Joi.number().greater(0).required(),
});
