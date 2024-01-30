import z from "zod";

export const serviceValidation = z.object({
  budget: z.coerce
    .number()
    .gte(1, "Quantity Required")
    .max(10000000, "Quantity must be less than 10000000"),

  schedule: z
    .string()
    .min(0, "schedule is required")
    .max(255, "schedule to large"),
  completionDate: z
    .string()
    .min(0, "schedule is required")
    .max(255, "schedule to large"),
  message: z.string().min(0, "schedule is required"),
});
