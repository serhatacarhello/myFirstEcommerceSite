import Joi from "joi";

const ProductSchema = Joi.object({
  name: Joi.string().required(),
  department: Joi.string().required(),
  description: Joi.string().min(3),
  price: Joi.string().required(),
  photos: Joi.string(),
});

export default ProductSchema;
