import * as z from "zod";

const serviceValidationSchema = z.object({
  name: z.string().min(3).max(50),
  price: z.coerce
    .number()
    .gte(0, "Price Required")
    .max(1000000, "Price To Big"),
  stock: z.coerce
    .number()
    .gte(0, "Stock Required")
    .max(255, "Stocks Too Large"),
  shippingFee: z.coerce
    .number()
    .gte(0, "Stock Required")
    .max(255, "Fee Too Large"),
  category: z.string().min(3, "Please Select Category").max(50),
  status: z.string(),
  description: z.string().min(3).max(50),
  summary: z.string().min(3).max(50),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
});

export const filterProductValidation = z.object({
  products: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
});

export default serviceValidationSchema;
