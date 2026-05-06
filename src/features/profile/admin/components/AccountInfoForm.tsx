// features/profile/admin/components/AccountInfoForm.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccountForm } from "../hooks/useAccountForm";

export const AccountInfoForm = () => {
  const {
    register,
    errors,
    isLoading,
    isEmailChangePending,
    onSubmit,
    onCancel,
  } = useAccountForm();

  return (
    <form className="flex flex-col flex-1 space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-medium-medium! text-title">
            الاسم
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="أدخل الاسم"
            className="p-3 md:p-4 text-regular-normal text-paragraph border-[1.5px] border-border block h-auto rounded-lg"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-medium-medium! text-title">
            البريد الإلكتروني
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="أدخل البريد الإلكتروني"
            className="p-3 md:p-4 text-regular-normal text-paragraph border-[1.5px] border-border block h-auto rounded-lg"
            disabled={isLoading || isEmailChangePending}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
          {isEmailChangePending && (
            <p className="text-sm text-primary mt-1">
              ✓ تم إرسال رابط التأكيد. يرجى التحقق من بريدك الإلكتروني الجديد لتأكيد التغيير.
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-auto">
        <Button
          type="submit"
          className="flex-1 py-3 md:py-3.5 rounded-xl md:rounded-2xl h-12 md:h-14 px-2 md:px-6 text-regular-bold md:text-medium-bold! text-bg bg-primary md:flex-none md:w-fit"
          disabled={isLoading || isEmailChangePending}
        >
          {isLoading ? "جاري الحفظ..." : isEmailChangePending ? "في انتظار التأكيد..." : "حفظ"}
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