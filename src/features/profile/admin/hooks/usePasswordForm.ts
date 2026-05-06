import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { profileService } from "@/features/common/profile.service";
import { AdminPasswordFormData } from "../types/profile.types";
import { adminPasswordFormSchema } from "../validations/profile.validation";

export const usePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminPasswordFormData>({
    resolver: zodResolver(adminPasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: AdminPasswordFormData) => {
    setIsLoading(true);
    try {
      await profileService.changePassword(data);
      toast.success("تم تغيير كلمة المرور بنجاح");
      reset();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء تغيير كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    reset();
  };

  return {
    register,
    errors,
    isLoading,
    onSubmit: handleSubmit(onSubmit),
    onCancel,
  };
};