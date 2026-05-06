"use client";

import { FormPasswordInput } from "@/components/common/FormPasswordInput";
import { AppButton } from "@/components/common/AppButton";
import { usePasswordForm } from "../hooks/usePasswordForm";

export function PasswordForm() {
  const {
    register,
    errors,
    isLoading,
    onSubmit,
    onCancel,
  } = usePasswordForm();

  return (
    <section>
      <h1 className="heading-3-bold text-title my-8 hidden md:block">تغيير كلمة المرور</h1>
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <FormPasswordInput
          name="currentPassword"
          label="كلمة المرور الحالية"
          register={register}
          error={errors.currentPassword}
          placeholder="أدخل كلمة المرور الحالية"
        />

        <FormPasswordInput
          name="newPassword"
          label="كلمة المرور الجديدة"
          register={register}
          error={errors.newPassword}
          placeholder="أدخل كلمة المرور الجديدة"
        />

        <FormPasswordInput
          name="confirmPassword"
          label="تأكيد كلمة المرور"
          register={register}
          error={errors.confirmPassword}
          placeholder="أعد إدخال كلمة المرور"
        />

        <div className="flex gap-4 mt-2">
          <AppButton type="submit" className='flex-1 md:w-fit' disabled={isLoading}>
            {isLoading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
          </AppButton>
          <AppButton type="button" className='flex-1 md:w-fit text-paragraph bg-disabled' onClick={onCancel}>
            إلغاء
          </AppButton>
        </div>
      </form>
    </section>
  );
}