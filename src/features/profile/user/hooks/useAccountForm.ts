"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { accountFormSchema } from "../schemas/profile.schema";
import { AccountFormData } from "../types/profile.types";
import { useProfile } from "./useProfile";
import { useProfileStore } from "@/store/profileStore";
import { profileService } from "@/features/common/profile.service";

const COUNTRY_CODES = [
  "+20",
  "+966",
  "+971",
  "+965",
  "+974",
  "+973",
  "+962",
];

export const parsePhone = (phone?: string | null) => {
  if (!phone) return { country: "+20", number: "" };

  const country = COUNTRY_CODES.find((c) =>
    phone.startsWith(c)
  );

  return {
    country: country || "+20",
    number: country ? phone.replace(country, "") : phone,
  };
};

export const formatPhone = (phone: {
  country: string;
  number: string;
}) => {
  return `${phone.country}${phone.number}`;
};

export const useAccountForm = () => {
  const { user, refetch } = useProfile();
  const { updateUser } = useProfileStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailChangePending, setIsEmailChangePending] =
    useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: { country: "+20", number: "" },
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name || "",
      email: user.email || "",
      phone: parsePhone(user.phone),
    });

    setIsEmailChangePending(false);
  }, [user, reset]);

  const onSubmit: SubmitHandler<AccountFormData> = async (
    data
  ) => {
    setIsLoading(true);

    try {
      const payload = {
        ...data,
        phone: formatPhone(data.phone),
      };

      await profileService.updateAccountInfo(
        payload,
        user?.email
      );

      if (data.email !== user?.email) {
        setIsEmailChangePending(true);
        toast.success("تم إرسال رابط تأكيد البريد");
      } else {
        updateUser({
          name: data.name,
          phone: payload.phone,
        });

        toast.success("تم تحديث البيانات بنجاح");
        await refetch();
      }
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ");
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    if (!user) return;

    reset({
      name: user.name || "",
      email: user.email || "",
      phone: parsePhone(user.phone),
    });

    setIsEmailChangePending(false);
  };

  return {
    register,
    control,
    errors,
    isLoading,
    isEmailChangePending,
    onSubmit: handleSubmit(onSubmit),
    onCancel,
  };
};