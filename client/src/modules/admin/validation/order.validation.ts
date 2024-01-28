import * as z from "zod";

const orderValidationSchema = z.object({
  name: z.string().min(3).max(50),
});

export default orderValidationSchema;
