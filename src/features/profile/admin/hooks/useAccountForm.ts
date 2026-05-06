// features/profile/admin/hooks/useAccountForm.ts
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useProfile } from "./useProfile";
import { useProfileStore } from "@/store/profileStore";
import { profileService } from "@/features/common/profile.service";
import { adminAccountFormSchema } from "../validations/profile.validation";
import { AdminAccountFormData } from "../types/profile.types";

export const useAccountForm = () => {
  const { user, refetch } = useProfile();
  const { updateUser } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailChangePending, setIsEmailChangePending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AdminAccountFormData>({
    resolver: zodResolver(adminAccountFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setIsEmailChangePending(false);
    }
  }, [user, setValue]);

  const onSubmit = async (data: AdminAccountFormData) => {
    setIsLoading(true);
    try {
      await profileService.updateAccountInfo(data, user?.email);
      
      if (data.email !== user?.email) {
        setIsEmailChangePending(true);
        toast.success(
          "تم إرسال رابط تأكيد إلى البريد الإلكتروني الجديد. يرجى التحقق من بريدك الإلكتروني وتأكيد التغيير."
        );
        setValue("email", user?.email || "");
      } else {
        updateUser({ name: data.name });
        toast.success("تم تحديث البيانات بنجاح");
        await refetch();
      }
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء تحديث البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEmailChangePending(false);
  };

  return {
    register,
    errors,
    isLoading,
    isEmailChangePending,
    onSubmit: handleSubmit(onSubmit),
    onCancel,
  };
};