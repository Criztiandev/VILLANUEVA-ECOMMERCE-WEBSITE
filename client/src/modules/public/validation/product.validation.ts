import z from "zod";

export const productValidation = z.object({
  quantity: z.coerce
    .number()
    .gte(1, "Quantity Required")
    .max(255, "Quantity must be less than 255"),
});
