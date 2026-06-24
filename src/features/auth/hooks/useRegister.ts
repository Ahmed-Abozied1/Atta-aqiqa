import { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { RegisterFormData } from "../schemas/register.schema";
import { AuthService } from "../services/auth.service";
import { toast } from "sonner";
import { getAuthErrorMessage } from "@/lib/auth-error";
import { completeRegistration } from "@/lib/pixel";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setView, setData } = useModalStore();

  const registerUser = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      const phoneString = `${data.phone.country}${data.phone.number}`;
      
      const response = await AuthService.signUp(
        data.email,
        data.password,
        data.name,
        phoneString
      );

      if (response && 'error' in response && response.error) {
        toast.error(getAuthErrorMessage(response.error.code));
        return;
      }

      completeRegistration();
      setData({ email: data.email });
      setView("OTP_VERIFICATION");
      toast.success("تم إنشاء الحساب بنجاح، يرجى التحقق من بريدك");
      
    } catch (err) {
      toast.error("حدث خطأ غير متوقع في الاتصال");
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading };
};