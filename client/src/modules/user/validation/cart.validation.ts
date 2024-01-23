import { z } from "zod";

export const cartPayloadSchema = z.object({
  _id: z.string().min(3).max(50),
  quantity: z.coerce.number().gte(0, "Quanity Required"),
});

export const checkOutValidation = z.object({
  fullName: z.string().min(3).max(50),
  email: z.string().min(3).max(50),
  contact: z.string().min(3).max(50),
  region: z.string().min(3).max(50),
  province: z.string().min(3).max(50),
  municipality: z.string().min(3).max(50),
  barangay: z.string().min(3).max(50),
});
