import { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { toast } from "sonner";
import { AuthService } from './../services/auth.service';

export const useResendOTP = () => {
  const [isResending, setIsResending] = useState(false);
  const { data, open } = useModalStore();

  const resendOTP = async (email?: string) => {
    setIsResending(true);
    const userEmail = email || data?.email;

    if (!userEmail) {
      toast.error("لم يتم العثور على البريد الإلكتروني");
      setIsResending(false);
      return false;
    }

    const { error } = await AuthService.sendVerificationOtp(userEmail);

    setIsResending(false);

    if (error) {
      if (error.code === "USER_NOT_FOUND") {
        toast.error("لم يتم العثور على المستخدم");
      } else {
        toast.error(error.message || "حدث خطأ في إرسال رمز التحقق");
      }
      return false;
    }

    toast.success("تم إرسال رمز التحقق بنجاح");
    open('OTP_VERIFICATION', { email: userEmail });
    return true;
  };

  return {
    resendOTP,
    isResending,
  };
};