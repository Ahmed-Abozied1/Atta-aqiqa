"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPasswordInput } from "@/components/common/FormPasswordInput";
import { AppButton } from "@/components/common/AppButton";
import { useModalStore } from "@/store/useModalStore";
import { resetPasswordSchema, ResetPasswordFormData } from "../schemas/password.schema";
import { usePasswordReset } from "../hooks/usePasswordReset";

interface ResetPasswordFormProps {
  role: 'ADMIN' | 'USER';
  token?: string;
}

export const ResetPasswordForm = ({ role, token: propsToken }: ResetPasswordFormProps) => {
  const { data } = useModalStore();
  
  const activeToken = propsToken || data?.token;

  const { resetPassword, isLoading } = usePasswordReset(role);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (formData: ResetPasswordFormData) => {
    if (isLoading) return;
    
    if (!activeToken) {
      return;
    }

    await resetPassword(formData, activeToken);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full text-right">
      <FormPasswordInput
        name="password"
        label="كلمة المرور الجديدة"
        register={register}
        error={errors.password}
        placeholder="أدخل كلمة المرور الجديدة"
      />

      <AppButton 
        type="submit" 
        isLoading={isLoading} 
        isDisabled={isLoading || !activeToken}
        className="w-full"
      >
        تحديث كلمة المرور
      </AppButton>
    </form>
  );
};