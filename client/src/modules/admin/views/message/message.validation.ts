import * as z from "zod";

const messageValidationSchema = z.object({
  target: z.string().min(3).max(50),
  content: z.string().min(3).max(255),
});

export const singleMessage = z.object({
  content: z.string().min(3).max(255),
});

export default messageValidationSchema;
