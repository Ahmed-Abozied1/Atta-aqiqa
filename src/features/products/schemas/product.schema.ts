import { z } from "zod";

export const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().min(1, "Comment is required"),
});

export const orderSchema = z.object({
  productId: z.string().min(1),
  intent: z.string().min(1),
  shares: z.number().min(1).max(7),
  beneficiaryName: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  address: z.string().min(5, "العنوان مطلوب"),
  totalPrice: z.number().positive(),
});

export const userDataSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  address: z.string().min(5, "العنوان مطلوب"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;
export type UserDataFormData = z.infer<typeof userDataSchema>;