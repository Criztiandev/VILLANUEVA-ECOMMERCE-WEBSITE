import mongoose from "mongoose";
import { ProductSchema } from "./products.js";

const productSchema = new mongoose.Schema<ProductSchema>({
  productImg: { type: String, default: "" },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  stocks: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ["indoor", "outdoor", "accessories", "sessional", "gift"],
    required: true,
  },
});

export default mongoose.model("product", productSchema);
