import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("صيغة البريد الإلكتروني غير صحيحة"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});


export const verificationSchema = z.object({
  otp: z.string().length(4, "رمز التحقق يجب أن يكون 4 أرقام"),
});



export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type VerificationFormData = z.infer<typeof verificationSchema>;