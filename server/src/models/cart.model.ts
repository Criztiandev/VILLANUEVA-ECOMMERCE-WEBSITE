import { CartModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const cardSchema = new Schema<CartModel>({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
  total: { type: Number, default: 0 },
});

export default model<CartModel>("Cart", cardSchema);
