"use client";

import { CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "إرسال الاسم ",
    description:
      "بنحتاج من حضرتك الاسم كامل لصاحب العقيقة أو الصدقة.",
  },
  {
    id: 2,
    title: "توثيق الذبح",
    description:
      "بيتم توثيق فيديو الذبح كامل باسم حضرتك وتاريخ الذبح.",
  },
  {
    id: 3,
    title: "توثيق التوزيع",
    description:
      "بيتم توثيق توزيعات الإطعامات باسم حضرتك وتاريخ الذبح.",
  },
  {
    id: 4,
    title: "استلام التوثيق",
    description:
      "بنرسل لحضرتك فيديو الذبح وصور الإطعامات على رقم الواتساب.",
  },
];
export const ProductDocumentation = () => {
  return (
    <div className="">
      <h3 className="heading-6-bold md:heading-5-bold text-title mb-4">طريقة التوثيق</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 p-2">
        {STEPS.map((step) => (
          <div 
            key={step.id} 
            className="flex flex-col items-center gap-2 text-center p-4 bg-bg rounded-3xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)]!"
          >
              <CheckCircle2 fill="currentColor" className="w-7.25 md:w-9 h-7.25 md:h-9 text-bg fill-success" />
            
            <h4 className="text-small-bold md:text-regular-bold text-title mt-0 md:mt-2">
              {step.title}
            </h4>
            
            <p className="text-small-normal md:text-regular-normal text-paragraph">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};