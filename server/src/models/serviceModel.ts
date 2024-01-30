import { ServiceModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const serviceSchema = new Schema<ServiceModel>(
  {
    images: [{ type: String, required: true }],
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    slots: { type: Number, required: true },
    rate: { type: Number, required: true },
    startingPrice: { type: Number, required: true },
    description: { type: String, required: true },
    services: [{ type: String, required: true }],

    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

export default model<ServiceModel>("service", serviceSchema);
