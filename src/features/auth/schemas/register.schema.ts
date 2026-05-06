import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  phone: z.object({
    country: z.string(),
    number: z
      .string()
      .min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل")
      .regex(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  }),
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  acceptTerms: z
    .boolean()
    .refine(val => val === true, 'يجب الموافقة على الشروط والأحكام')
});

export type RegisterFormData = z.infer<typeof registerSchema>;