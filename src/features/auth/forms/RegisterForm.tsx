// features/auth/components/RegisterForm.tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/common/FormInput";
import { FormCheckbox } from "@/components/common/FormCheckbox";
import { FormPasswordInput } from "@/components/common/FormPasswordInput";
import { AppButton } from "@/components/common/AppButton";
import { Label } from "@/components/ui/label";

import { useModalStore } from "@/store/useModalStore";
import { useRegister } from "../hooks/useRegister";
import { RegisterFormData, registerSchema } from "../schemas/register.schema";
import { PhoneInputField } from "@/components/common/PhoneInput";

export const RegisterForm = () => {
  const { setView } = useModalStore();
  const { registerUser, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptTerms: false },
  });

  return (
    <form onSubmit={handleSubmit(registerUser)} className="space-y-5 w-full">
      <FormInput
        name="name"
        label="الاسم"
        register={register}
        error={errors.name}
        placeholder="أدخل الاسم"
      />

      <FormInput
        name="email"
        label="البريد الإلكتروني"
        type="email"
        register={register}
        error={errors.email}
        placeholder="أدخل البريد الإلكتروني"
      />

      <PhoneInputField
        name="phone"
        control={control}
        error={errors.phone}
        label="رقم الواتساب"
      />

      <FormPasswordInput
        name="password"
        label="كلمة المرور"
        register={register}
        error={errors.password}
        placeholder="أدخل كلمة المرور"
      />

      <FormCheckbox
        name="acceptTerms"
        label={
          <span>
            أوافق على{" "}
            <button
              type="button"
              onClick={() => window.open("/terms", "_blank")}
              className="text-secondary cursor-pointer text-regular-link hover:underline"
            >
              الشروط والأحكام
            </button>
            {" "}و{" "}
            <button
              type="button"
              onClick={() => window.open("/privacy", "_blank")}
              className="text-secondary text-regular-link cursor-pointer hover:underline"
            >
              سياسة الخصوصية
            </button>
          </span>
        }
        register={register}
        error={errors.acceptTerms}
      />

      <AppButton type="submit" isLoading={isLoading}>
        إنشاء حساب جديد
      </AppButton>

      <p className="text-small-medium md:text-regular-medium text-title text-center">
        هل لديك حساب بالفعل؟{" "}
        <button
          type="button"
          onClick={() => setView("LOGIN")}
          className="text-secondary text-regular-link mr-2 hover:underline cursor-pointer"
        >
          تسجيل الدخول
        </button>
      </p>
    </form>
  );
};