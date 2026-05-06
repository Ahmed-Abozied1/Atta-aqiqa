import { z } from "zod";
import { accountFormSchema, passwordFormSchema } from "../schemas/profile.schema";

export type AccountFormData = z.infer<typeof accountFormSchema>;
export type PasswordFormData = z.infer<typeof passwordFormSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  phone?: string | null;
}