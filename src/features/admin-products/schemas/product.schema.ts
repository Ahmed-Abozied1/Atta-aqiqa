import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  description: z.string().min(1, "الوصف مطلوب"),
  price: z.coerce.number().min(0, "السعر يجب أن يكون أكبر من أو يساوي 0"),
  location: z.enum(["INSIDE_EGYPT", "OUTSIDE_EGYPT"]),
  beneficiaries: z.string().min(1, "المستفيدين مطلوب"),
  intents: z.array(z.string()).min(1, "يجب اختيار نية واحدة على الأقل"),
  imageUrl: z.string().optional().nullable(),
  imageFile: z.any().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;