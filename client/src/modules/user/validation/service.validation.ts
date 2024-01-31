import z from "zod";

export const serviceValidation = z.object({
  budget: z.coerce
    .number()
    .gte(1, "Quantity Required")
    .max(10000000, "Quantity must be less than 10000000"),

  completionDate: z
    .string()
    .min(0, "Completion Date is required")
    .max(255, "Completion Date to large"),
  location: z.string().min(0, "Location is required"),
});
