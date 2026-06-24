"use client";

import { CircleCheckIcon } from "@/components/ui/icons/CircleCheckIcon";
import { AppButton } from "@/components/common/AppButton";
import { useModalStore } from "@/store/useModalStore";

export const BookingSuccess = () => {
  const { close } = useModalStore();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-2">
      <CircleCheckIcon className="h-16 w-16" />

      <p className="heading-6-bold text-title">
        شكرًا لاختيارك عطاء. تم تسجيل حجزك بنجاح، وستصلك رسالة بالتفاصيل قريبًا.
      </p>

      <AppButton onClick={close} className="w-full mt-1">
        إغلاق
      </AppButton>
    </div>
  );
};