"use client";

import { useState } from "react";
import { AppButton } from "@/components/common/AppButton";
import { useModalStore } from "@/store/useModalStore";
import { AuthService } from "../services/auth.service";

interface ResendVerificationButtonProps {
  email: string;
}

export const ResendVerificationButton = ({ email }: ResendVerificationButtonProps) => {
  const { open } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const { error: authError } = await AuthService.sendVerificationOtp(email);

    setIsLoading(false);

    if (authError) {
      if (authError.code === "USER_NOT_FOUND") {
        setError("لم يتم العثور على المستخدم");
      } else if (authError.code === "EMAIL_NOT_VERIFIED") {
        setError("البريد الإلكتروني غير مفعل");
      } else {
        setError(authError.message || "حدث خطأ في إرسال رمز التحقق");
      }
    } else {
      setSuccess("تم إرسال رمز التحقق بنجاح");
      open('OTP_VERIFICATION', { email });
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2 text-center">
      {success && <span className="text-green-600">{success}</span>}
      {error && <span className="text-red-600">{error}</span>}
      <AppButton type="button" onClick={handleResend} isLoading={isLoading}>
        إعادة إرسال رمز التحقق
      </AppButton>
    </div>
  );
};