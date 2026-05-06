import { z } from "zod";

export const createOrderSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  intent: z.enum(["SADAKA", "AQEEQA", "NAZR", "ADHIYA", "KAFFARA"]),
  shares: z.number().int().min(1).max(7),
  beneficiaryName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  totalPrice: z.number().positive(),
});

export const userDataSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  address: z.string().min(5, "العنوان مطلوب"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UserDataInput = z.infer<typeof userDataSchema>;