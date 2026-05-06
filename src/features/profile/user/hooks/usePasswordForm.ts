// features/profile/user/hooks/usePasswordForm.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PasswordFormData } from "../types/profile.types";
import { passwordFormSchema } from "../schemas/profile.schema";
import { profileService } from "@/features/common/profile.service";

export const usePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
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