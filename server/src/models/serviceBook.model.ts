import { ServiceScheduleModel } from "../interfaces/model.js";
import { Schema, model } from "mongoose";

const serviceBookSchema = new Schema<ServiceScheduleModel>(
  {
    serviceId: { type: String, required: true },
    schedule: { type: String, required: true },
    completionDate: { type: String, required: true },
    customer: { type: String, required: true },
    budget: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ServiceScheduleModel>("serviceBook", serviceBookSchema);
