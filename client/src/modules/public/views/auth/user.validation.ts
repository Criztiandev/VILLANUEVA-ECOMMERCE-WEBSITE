import * as z from "zod";

const customerValidationSchema = z.object({
  firstName: z.string().min(3).max(50),
  middleName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  age: z.coerce.number().gte(0, "Stock Required"),
  birthDate: z.string().min(3).max(50),
  contact: z.string().min(3, "Too Short").max(12, "Too Long"),
  gender: z.string().min(3).max(50),

  address: z.string().min(3).max(255),
  street: z.string().min(3).max(50),
  building: z.string().min(0).max(50),
  houseNo: z.string().min(0).max(50),
  postalCode: z.string().min(3).max(50),

  email: z.string().email().min(3).max(50),
  password: z
    .string()
    .min(3, "Password Too Short")
    .max(15, "Password Too long"),
});

export default customerValidationSchema;
