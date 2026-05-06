"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalHeader } from "./ModalHeader";
import { useEffect } from "react";
import { FormInput } from "@/components/common/FormInput";
import { PhoneInputField } from "@/components/common/PhoneInput";

interface UserDataFormProps {
  name: string;
  setName: (value: string) => void;
  phone: { country: string; number: string };
  setPhone: (value: { country: string; number: string }) => void;
}

const formSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
phone: z.object({
  country: z.string(),
  number: z
    .string()
    .min(8, "رقم الهاتف قصير جداً")
    .max(15, "رقم الهاتف طويل جداً")
    .regex(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط")
    .refine((val) => val[0] !== "0", {
      message: "رقم الهاتف لا يبدأ بـ 0",
    }),
})
});

type FormData = z.infer<typeof formSchema>;

export const UserDataForm = ({
  name,
  setName,
  phone,
  setPhone,
}: UserDataFormProps) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: name || "",
      phone: phone || { country: "+20", number: "" },
    },
  });

  const watchedName = watch("name");
  const watchedPhone = watch("phone");

  useEffect(() => {
    if (watchedName !== undefined && watchedName !== name) {
      setName(watchedName || "");
    }
  }, [watchedName]);

  useEffect(() => {
    if (watchedPhone !== undefined && watchedPhone !== phone) {
      setPhone(watchedPhone || { country: "+20", number: "" });
    }
  }, [watchedPhone]);

  return (
    <div className="flex-1" dir="rtl">
      <ModalHeader
        title="البيانات"
        description="يرجى إدخال البيانات المطلوبة بدقة لضمان إتمام الطلب بنجاح."
      />

      <div className="space-y-4">
        <FormInput
          name="name"
          label="الاسم كامل"
          register={register}
          error={errors.name}
          placeholder="أدخل الاسم كامل"
        />

        <PhoneInputField
          name="phone"
          control={control}
          error={errors.phone}
          label="رقم الواتساب"
        />
      </div>
    </div>
  );
};