import { z } from "zod";
import { adminAccountFormSchema, adminPasswordFormSchema } from "../validations/profile.validation";

export type AdminAccountFormData = z.infer<typeof adminAccountFormSchema>;
export type AdminPasswordFormData = z.infer<typeof adminPasswordFormSchema>;

export interface User {
  name: string;
  email: string;
  image?: string;
  role?: string;
}