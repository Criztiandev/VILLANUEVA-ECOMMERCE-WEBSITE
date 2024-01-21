import * as z from "zod";

const messageValidationSchema = z.object({
  customer: z.string().min(3).max(50),
  message: z.string().min(3).max(50),
});

export default messageValidationSchema;
