import * as z from "zod";

export interface CategoryModel {
  _id?: string;
  name: string;
  count?: number;
}

const categortValidationSchema = z.object({
  name: z.string().min(3, "Too short").max(255, "Too long"),
  count: z.coerce.number().gte(0, "Count Required"),
});

export default categortValidationSchema;
