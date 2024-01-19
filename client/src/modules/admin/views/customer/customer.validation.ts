import * as z from "zod";

export interface CustomerModel {
  _id?: string;
  fullName: string;
  contact: string;
  email: string;
  address: string;
  gender: string;
  age: string;
}

const customerValidationSchema = z.object({
  fullName: z.string().min(3).max(50),
  contact: z.string().min(3, "Too Short").max(12, "Too Long"),
  email: z.string().email().min(3).max(50),
  address: z.string().min(3).max(50),
  gender: z.string().min(3).max(50),
  age: z.coerce.number().gte(0, "Stock Required"),
});

export default customerValidationSchema;
