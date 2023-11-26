import mongoose from "mongoose";
import { generateFakeProducts } from "../fakeProducts.js";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  department: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", ProductSchema);

export default Product;
