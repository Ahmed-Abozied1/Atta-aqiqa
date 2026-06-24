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

const intentMap: Record<string, string> = {
  ADHIYA: "أضحية",
  SADAKA: "صدقة",
  AQEEQA: "عقيقة",
  NAZR: "نذر",
  KAFFARA: "كفارة",
};

export const OrderSummary = ({ data, name, quantity, phone }: OrderSummaryProps) => {
  const productName = data?.productName || "خروف";
  const location = data?.location || "INSIDE_EGYPT";
  const intent = data?.intent || "ADHIYA";
  const unitPrice = data?.price ?? 0;
  const safeQuantity = Math.max(1, Math.floor(quantity));
  const totalPrice = unitPrice * safeQuantity;
  const locationLabel = location === "INSIDE_EGYPT" ? "داخل مصر" : "أفريقيا";
  const intentLabel = intentMap[intent] || "أضحية";
  const phoneString = `${phone.country}${phone.number}`;

  const rows = [
    { label: "اسم المستفيد", value: name || "غير محدد" },
    { label: "رقم الواتساب", value: phoneString, ltr: true },
    { label: "نوع النية", value: intentLabel },
    { label: "مكان التنفيذ", value: locationLabel },
    { label: "الذبيحة", value: productName },
    { label: "السعر", value: `${unitPrice.toLocaleString('en-US')} ج.م` },
    { label: "الكمية", value: safeQuantity.toString() },
  ];

  return (
    <div className="flex-1">
      <ModalHeader
        title="ملخص الطلب"
        description="أكد من صحة جميع التفاصيل قبل تأكيد الطلب لضمان تنفيذ الحجز بالشكل الصحيح."
      />

      <div className="flex flex-col md:flex-row gap-4 p-3 md:p-5 border border-border rounded-2xl bg-bg mt-2">
        <div className="relative w-full h-48 md:h-auto md:w-44 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={data?.imageUrl || "/images/products/sheep.webp"}
            alt={productName}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col flex-1 gap-0">
          {rows.map((row, i) => (
            <div key={row.label}>
              <div className="flex items-center justify-between py-3 px-1">
                <span className="text-small-normal md:text-regular-normal text-paragraph">
                  {row.label}
                </span>
                <span
                  className="text-small-bold md:text-regular-bold text-title"
                  dir={row.ltr ? "ltr" : undefined}
                >
                  {row.value}
                </span>
              </div>
              {i < rows.length - 1 && (
                <div className="border-t border-border" />
              )}
            </div>
          ))}

          <div className="mt-3 pt-3 border-t-2 border-primary flex items-center justify-between px-1">
            <span className="text-regular-bold md:heading-6-bold text-primary">
              إجمالي المبلغ
            </span>
            <span className="text-regular-bold md:heading-6-bold text-primary">
              {totalPrice.toLocaleString('en-US')} ج.م
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
