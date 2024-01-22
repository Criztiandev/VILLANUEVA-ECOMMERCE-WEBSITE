import { ProductModel, ServiceModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const serviceSchema = new Schema<ServiceModel>(
  {
    images: [{ type: String, required: true }],
    name: { type: String, required: true, unique: true },
    price: { type: Number, default: 0 },
    scheduleStart: { type: String, require: true },
    scheduleEnd: { type: String, require: true },
    description: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ServiceModel>("service", serviceSchema);
