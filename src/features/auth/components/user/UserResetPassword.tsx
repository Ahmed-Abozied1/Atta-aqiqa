"use client";

import { ResetPasswordForm } from "../../forms/ResetPasswordForm";
import { AuthLayout } from "../AuthLayout";

interface UserResetPasswordProps {
  token: string;
}

export const UserResetPassword = ({ token }: UserResetPasswordProps) => {
  return (
    <AuthLayout
      title="إعادة تعيين كلمة المرور"
      subtitle="يرجى إدخال كلمة مرور جديدة لحسابك"
    >
      <ResetPasswordForm role="USER" token={token} />
    </AuthLayout>
  );
};