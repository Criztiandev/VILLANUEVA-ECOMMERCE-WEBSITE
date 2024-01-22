import { z } from "zod";

export const cartPayloadSchema = z.object({
  _id: z.string().min(3).max(50),
  quantity: z.coerce.number().gte(0, "Stock Required"),
});
