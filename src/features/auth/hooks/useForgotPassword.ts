import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { getAuthErrorMessage } from "@/lib/auth-error";
import { useModalStore } from "@/store/useModalStore";

export const useForgotPassword = (role: "ADMIN" | "USER") => {
  const { close } = useModalStore();

  const handleForgotPassword = async (
    email: string,
    resetForm: () => void
  ) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    const resetPath =
      role === "ADMIN" ? "/admin/reset-password" : "/";

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${baseUrl}${resetPath}`,
    });

    if (error) {
      toast.error(getAuthErrorMessage(error.code));
      return;
    }
console.log("Password reset email sent successfully");
    toast.success("تم إرسال رابط إعادة تعيين كلمة المرور، تفقد بريدك");
    resetForm();
    close();
  };

  return { handleForgotPassword };
};