import { ProductModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const productSchema = new Schema<ProductModel>(
  {
    cover: { type: String },
    images: [{ type: String, required: true }],
    name: { type: String, required: true, unique: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    category: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    summary: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    sales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<ProductModel>("Product", productSchema);
