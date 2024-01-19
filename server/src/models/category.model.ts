import { CategoryModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const modelSchema = new Schema<CategoryModel>({
  name: { type: String, require: true },
  count: { type: Number, require: true, default: 0 },
});

export default model<CategoryModel>("category", modelSchema);
