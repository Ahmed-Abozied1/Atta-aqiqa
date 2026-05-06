"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components/common/AppButton";
import { FormInput } from "@/components/common/FormInput";
import { useModalStore } from "@/store/useModalStore";
import { useForgotPassword } from "../hooks/useForgotPassword";

type ForgotPasswordFormData = {
  email: string;
};

interface ForgotPasswordFormProps {
  role: 'ADMIN' | 'USER';
}

export const ForgotPasswordForm = ({ role }: ForgotPasswordFormProps) => {
  const router = useRouter();
  const { setView } = useModalStore();
  const { handleForgotPassword } = useForgotPassword(role);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = 
    useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await handleForgotPassword(data.email, reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <FormInput
        name="email"
        label="البريد الإلكتروني"
        register={register}
        error={errors.email}
        type="email"
        placeholder="أدخل البريد الإلكتروني"
      />

      <AppButton type="submit" isLoading={isSubmitting} className="w-full">
        إرسال 
      </AppButton>


       <p className="text-small-medium md:text-regular-medium text-title text-center">
        تذكرت كلمة المرور؟{" "}
        <button
          type="button"
          onClick={() => {
            if (role === 'ADMIN') {
              router.push("/admin/login");
            } else {
              setView('LOGIN');
            }
          }}
            className="text-secondary text-regular-link mr-2 hover:underline cursor-pointer"
        >
          تسجيل الدخول
        </button>
      </p>
    </form>
  );
};