import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { LoginFormData } from "../schemas/login.schema";
import { AuthService } from "../services/auth.service";
import { toast } from "sonner";
import { UserRole } from "../types";
import { getAuthErrorMessage } from "@/lib/auth-error";

export const useLogin = (role: UserRole) => {
  const router = useRouter();
  const { setView, open } = useModalStore();
  
  const [emailForVerification, setEmailForVerification] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const handleLogin = async (values: LoginFormData) => {
    setEmailForVerification(null);

    const destination = role === "ADMIN" ? "/admin" : "/";
    const response = await AuthService.signIn(
      values.email,
      values.password,
      !!values.rememberMe,
      destination
    );

    if (response && 'error' in response && response.error) {
      const { error } = response;
      
      toast.error(getAuthErrorMessage(error.code));
      
      if (error.code === "EMAIL_NOT_VERIFIED") {
        setEmailForVerification(values.email);
      }
      return;
    }

    toast.success("تم تسجيل الدخول بنجاح");
    router.push(role === "ADMIN" ? "/admin" : "/");
};

  const handleResendVerification = async (email: string) => {
    setIsResending(true);
    try {
      const response = await AuthService.sendVerificationOtp(email);

      if (response && 'error' in response && response.error) {
        toast.error(getAuthErrorMessage(response.error.code));
      } else {
        toast.success("تم إرسال رمز التحقق بنجاح");
        open('OTP_VERIFICATION', { email });
      }
    } finally {
      setIsResending(false);
    }
  };

  return {
    handleLogin,
    handleResendVerification,
    emailForVerification,
    isResending,
    setView,
    router
  };
};