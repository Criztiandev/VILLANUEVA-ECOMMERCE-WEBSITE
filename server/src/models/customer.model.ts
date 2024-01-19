import { CustomerModel } from "../interfaces/model.ts";
import { Schema, model } from "mongoose";

const customerSchema = new Schema<CustomerModel>(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    contact: { type: String, require: true },
    address: { type: String, require: true },
    gender: { type: String, require: true },
    age: { type: Number, require: true },
  },
  { timestamps: true }
);

export default model<CustomerModel>("customer", customerSchema);
