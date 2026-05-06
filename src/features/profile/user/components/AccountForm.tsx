"use client";

import { useAccountForm } from "../hooks/useAccountForm";
import { FormInput } from "@/components/common/FormInput";
import { AppButton } from "@/components/common/AppButton";
import { PhoneInputField } from "@/components/common/PhoneInput";

export function AccountForm() {
  const {
    register,
    control,
    errors,
    isLoading,
    isEmailChangePending,
    onSubmit,
    onCancel,
  } = useAccountForm();

  return (
    <section>
      <h1 className="heading-3-bold text-title my-8 hidden md:block">
        بيانات الحساب
      </h1>

      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <FormInput
          name="name"
          label="الاسم"
          register={register}
          error={errors.name}
          placeholder="أدخل الاسم"
        />

        <div>
          <FormInput
            name="email"
            label="البريد الإلكتروني"
            type="email"
            register={register}
            error={errors.email}
            placeholder="أدخل البريد الإلكتروني"
          />
          {isEmailChangePending && (
            <p className="text-sm text-primary mt-1">
              ✓ تم إرسال رابط التأكيد. يرجى التحقق من بريدك الإلكتروني الجديد لتأكيد التغيير.
            </p>
          )}
        </div>

        <PhoneInputField
          name="phone"
          control={control}
          error={errors.phone}
          label="رقم الواتساب"
        />

        <div className="flex gap-4 mt-2">
          <AppButton
            type="submit"
            className="flex-1 md:w-fit"
            disabled={isLoading || isEmailChangePending}
          >
            {isLoading
              ? "جاري الحفظ..."
              : isEmailChangePending
              ? "في انتظار التأكيد..."
              : "حفظ"}
          </AppButton>

          <AppButton
            type="button"
            className="flex-1 md:w-fit text-paragraph bg-disabled"
            onClick={onCancel}
            disabled={isLoading}
          >
            إلغاء
          </AppButton>
        </div>
      </form>
    </section>
  );
}