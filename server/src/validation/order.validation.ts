import { z } from "zod";

const orderValidationSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  total: z.number(),
});

export default orderValidationSchema;
