import { z } from "zod";

const UserModelValidation = z.object({
  _id: z.string().optional(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
});

export default UserModelValidation;
