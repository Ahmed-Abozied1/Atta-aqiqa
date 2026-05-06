"use client";

import Image from "next/image";
import { ModalHeader } from "./ModalHeader";
import { BookingModalData, PhoneObject } from "../types/product.types";

interface OrderSummaryProps {
  data: BookingModalData | null;
  name: string;
  quantity: number;
  phone: PhoneObject;
}

const getBookingTypeLabel = (
  productName: string,
  location: string,
  intent: string
) => {
  const locationLabel =
    location === "INSIDE_EGYPT" ? "داخل مصر" : "خارج مصر";

  const intentMap: Record<string, string> = {
    ADHIYA: "أضحية",
    SADAKA: "صدقة",
    AQEEQA: "عقيقة",
    NAZR: "نذر",
    KAFFARA: "كفارة",
  };

  const intentLabel = intentMap[intent] || "أضحية";

  return `${productName} ${intentLabel} ${locationLabel}`;
};

export const OrderSummary = ({
  data,
  name,
  quantity,
  phone,
}: OrderSummaryProps) => {
  const productName = data?.productName || "خروف";
  const location = data?.location || "INSIDE_EGYPT";
  const intent = data?.intent || "ADHIYA";

  const unitPrice = data?.price ?? 0;

  const safeQuantity = Math.max(1, Math.floor(quantity));

  const totalPrice = unitPrice * safeQuantity;

  const bookingType = getBookingTypeLabel(
    productName,
    location,
    intent
  );

  const phoneString = `${phone.country}${phone.number}`;

  return (
    <div className="flex-1">
      <ModalHeader
        title="ملخص الطلب"
        description="تأكد من صحة جميع التفاصيل قبل تأكيد الطلب لضمان تنفيذ الأضحية بالشكل الصحيح."
      />

      <div className="flex flex-col md:flex-row gap-4 p-2 md:p-4 md:border border-border rounded-lg md:rounded-2xl bg-bg">
        <div className="relative w-full h-48 md:h-auto md:w-50 md:min-h-full shrink-0 overflow-hidden">
          <Image
            src={data?.imageUrl || "/images/products/sheep.webp"}
            alt={productName}
            fill
            className="object-contain rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <div className="space-y-2 text-regular-normal md:text-large-normal text-paragraph">
            <p>
              الاسم: <span className="text-title">{name || "غير محدد"}</span>
            </p>

            <p>
              رقم الواتساب:{" "}
              <span className="text-title" dir="ltr">{phoneString || "غير محدد"}</span>
            </p>

            <p>
              نوع الحجز:{" "}
              <span className="text-title">{bookingType}</span>
            </p>

            <p>
              سعر الوحدة:{" "}
              <span className="text-title">
                {unitPrice.toLocaleString()} ج.م
              </span>
            </p>

            <div className="flex items-center gap-4 mt-2">
              <span className="text-paragraph">الكمية:</span>
              <span className="text-title">{safeQuantity}</span>
            </div>
          </div>

          <div>
            <p className="text-medium-bold md:heading-6-bold text-primary">
              إجمالي المبلغ: {totalPrice.toLocaleString()} ج.م
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};