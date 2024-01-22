import * as z from "zod";

const serviceValidationSchema = z.object({
  name: z.string().min(3).max(50),
  price: z.coerce.number().gte(0, "Stock Required"),
  scheduleStart: z.string().min(3).max(50),
  scheduleEnd: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  status: z.string().min(3).max(50),
});

export default serviceValidationSchema;
