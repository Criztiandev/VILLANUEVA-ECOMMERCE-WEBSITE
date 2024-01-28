import z from "zod";

export const checkoutValidation = z.object({
  schedule: z.string().min(0, "Schedule is required"),
  address: z.string().min(0, "Address is required").max(255, "Too long"),
  method: z.string().min(0, "method is required").max(255, "Too long"),
});
