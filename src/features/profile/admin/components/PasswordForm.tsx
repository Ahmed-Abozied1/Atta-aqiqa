"use client";

import { Button } from "@/components/ui/button";
import { usePasswordForm } from "../hooks/usePasswordForm";
import { FormPasswordInput } from "@/components/common/FormPasswordInput";

export const PasswordForm = () => {
 const {
    register,
    errors,
    isLoading,
    onSubmit,
    onCancel,
  } = usePasswordForm();

   const passwordFields = [
    {
      name: "currentPassword",
      label: "كلمة المرور الحالية",
    },
    {
      name: "newPassword",
      label: "كلمة المرور الجديدة",
    },
    {
      name: "confirmPassword",
      label: "تأكيد كلمة المرور",
    },
  ] as const;

  return (
    <form className="flex flex-col flex-1 space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-300">
          {passwordFields.map((field) => (
          <FormPasswordInput
            key={field.name}
            name={field.name}
            label={field.label}
            register={register}
            error={errors[field.name]}
            placeholder={`أدخل ${field.label}`}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        <Button
          type="submit"
          className="flex-1 py-3 md:py-3.5 rounded-xl md:rounded-2xl h-12 md:h-14 px-2 md:px-6 text-regular-bold md:text-medium-bold! text-bg bg-primary md:flex-none md:w-fit"
          disabled={isLoading}
        >
          {isLoading ? "جاري التغيير..." : "تغيير كلمة المرور"}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 md:py-3.5 rounded-xl md:rounded-2xl h-12 md:h-14 px-2 md:px-6 text-regular-bold md:text-medium-bold! bg-disabled text-paragraph md:flex-none md:w-fit"
          disabled={isLoading}
        >
          إلغاء
        </Button>
      </div>
    </form>
  );
};