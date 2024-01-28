import { OrderModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const orderSchema = new Schema<OrderModel>(
  {
    refID: { type: String, required: true },
    UID: { type: String, required: true },
    products: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    tax: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    total: { type: Number, required: true },
    medthod: { type: String, required: true, default: "COD" },
    status: { type: String, required: true, default: "Pending" },
  },
  { timestamps: true }
);

export default model<OrderModel>("Order", orderSchema);
