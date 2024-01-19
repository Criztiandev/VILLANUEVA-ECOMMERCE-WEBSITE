import { ProductModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const productSchema = new Schema<ProductModel>(
  {
    images: [{ type: String, required: true }],
    name: { type: String, required: true, unique: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<ProductModel>("Product", productSchema);
