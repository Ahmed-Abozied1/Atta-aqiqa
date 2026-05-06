import { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { toast } from "sonner";
import { AuthService } from "../services/auth.service";
import { getAuthErrorMessage } from "@/lib/auth-error";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/auth/hooks/useAuth";

export const useVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data, setView } = useModalStore();

  const { refetch } = useSession(); // ✅ important
  const router = useRouter(); // optional but useful

  const verifyOTP = async (otp: string, email?: string) => {
    const userEmail = email || data?.email;

    if (!userEmail) {
      setError("البريد الإلكتروني مفقود");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: verifyError } = await AuthService.verifyEmail(userEmail, otp);

      if (verifyError) {
        setError(getAuthErrorMessage(verifyError.code));
        setIsLoading(false);
        return false;
      }

      // ✅ IMPORTANT FIX
      await refetch(); // refresh session/user
      router.refresh(); // refresh server components (Next.js App Router)

      toast.success("تم تفعيل الحساب بنجاح");

      setView("VERIFICATION_SUCCESS");

      return true;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    verifyOTP,
    isLoading,
    error,
    setError,
  };
};