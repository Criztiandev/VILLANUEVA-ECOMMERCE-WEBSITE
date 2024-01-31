import * as z from "zod";

export interface ServiceModel {
  _id?: string;
  images?: Array<string>;

  name: string;
  category: string;
  budget: number;
  preferedSchedule: string;
  location: string;
  slots: number;
  rate: number;

  description?: string;
  isPublished: boolean;
  isFeatured: boolean;
  status: string;
}

const serviceValidationSchema = z.object({
  name: z.string().min(3).max(50),
  category: z.string().min(5, "Too Short").max(255, "Too Long"),

  slots: z.coerce.number().gte(0, "slots Required").max(100, "Slots Too Large"),
  rate: z.coerce.number().gte(0, "Stock Required"),
  startingPrice: z.coerce.number().gte(0, "Stock Required"),

  description: z.string().min(3).max(10000),

  serviceOne: z.string().min(5, "Too Short").max(255, "Too Long"),
  serviceTwo: z.string().min(5, "Too Short").max(255, "Too Long"),
  serviceThree: z.string().min(5, "Too Short").max(255, "Too Long"),
  serviceFour: z.string().min(5, "Too Short").max(255, "Too Long"),
  serviceFive: z.string().min(5, "Too Short").max(255, "Too Long"),

  isPublished: z.boolean(),
  isFeatured: z.boolean(),
});

export const filterProductValidation = z.object({
  products: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
});

export const serviceScheduleValidation = z.object({
  budget: z.coerce
    .number()
    .gte(1, "Quantity Required")
    .max(10000000, "Quantity must be less than 10000000"),

  completionDate: z
    .string()
    .min(0, "Completion Date is required")
    .max(255, "Completion Date to large"),
  location: z.string().min(0, "Location is required"),
});

export default serviceValidationSchema;
