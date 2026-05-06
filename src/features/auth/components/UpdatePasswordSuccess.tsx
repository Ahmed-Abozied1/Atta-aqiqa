'use client';

import { AuthSuccess } from "@/features/auth/components/AuthSuccess";
import { useModalStore } from "@/store/useModalStore";
import { usePathname, useRouter } from "next/navigation";

export const UpdatePasswordSuccess = () => {
  const { setView } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleContinue = () => {
    if (pathname.includes("/admin")) {
      router.push("/admin/login");
    } else {
      setView("LOGIN");
    }
  };

  return (
    <AuthSuccess
      title="تم تحديث كلمة المرور بنجاح"
      subtitle="يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة."
      buttonText="تسجيل الدخول"
      onContinue={handleContinue}
    />
  );
};