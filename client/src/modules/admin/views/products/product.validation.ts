import * as z from "zod";

const productValidationSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  price: z.coerce.number().gte(0, "Stock Required"),
  stock: z.coerce.number().gte(0, "Stock Required"),
  category: z.string().min(3).max(50),
  status: z.enum(["new", "sale"]),
  isPublished: z.boolean(),
});

export const filterProductValidation = z.object({
  products: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
});

export default productValidationSchema;
