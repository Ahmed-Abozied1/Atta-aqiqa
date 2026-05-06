"use client";

import { useRouter } from "next/navigation";
import { AuthSuccess } from '@/features/auth/components/AuthSuccess';

export const VerifySuccess = () => {
  const router = useRouter();

  return (
    <AuthSuccess
      title="تم التحقق بنجاح"
      subtitle="يمكنك الآن الاستمتاع بجميع خدماتنا"
      buttonText="الذهاب للرئيسية"
      onContinue={() => router.push("/")}
    />
  );
};
