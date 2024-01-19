import * as z from "zod";

const categorySchema = z.object({
  name: z.string().min(3).max(50),
});

export default categorySchema;
