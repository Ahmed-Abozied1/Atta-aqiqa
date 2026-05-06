"use client";

import { CircleCheckIcon } from "@/components/ui/icons/CircleCheckIcon";
import { AppButton } from "@/components/common/AppButton";

interface BookingSuccessProps {
  onClose: () => void;
  isSuccessStep?: boolean; 
}

export const BookingSuccess = ({ onClose, isSuccessStep }: BookingSuccessProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 md:gap-8 mt-8">
      <CircleCheckIcon className="h-24 md:w-30 w-24 md:h-30"/>

      <div className="flex flex-col gap-2">
        <h1 className="heading-6-bold md:heading-4-bold text-title">
          تم اتمام الحجز بنجاح
        </h1>

        <p className="text-regular-normal md:text-large-normal text-paragraph mb-4">
          شكرًا لاختيارك خدمتنا. تم تسجيل طلبك بنجاح، وستصلك جميع التفاصيل الخاصة بالأضحية وطريقة التوصيل قريبًا.
        </p>
      </div>

      <AppButton
        onClick={onClose}
        className="w-full md:w-64"
      >
        إغلاق
      </AppButton>
    </div>
  );
};