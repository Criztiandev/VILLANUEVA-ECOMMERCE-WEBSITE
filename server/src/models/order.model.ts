import { OrderModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const orderSchema = new Schema<OrderModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    cart: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
    total: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default model<OrderModel>("Order", orderSchema);
