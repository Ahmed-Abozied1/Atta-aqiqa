"use client";

import { useModalStore } from "@/store/useModalStore";
import { AuthLayout } from "../AuthLayout";
import { VerificationForm } from "../../forms/VerificationForm";

export const UserVerification = () => {
  const { data } = useModalStore();
  const email = data?.email;

  return (
    <AuthLayout
      title="التحقق من بريدك الإلكتروني"
      subtitle={
        <div className="flex flex-col items-center">
          <p>أرسلنا رمز تحقق مكوّن من 4 أرقام إلى بريدك</p>
          {email && (
            <div className="flex items-center justify-center whitespace-nowrap md:whitespace-nowrap mt-2">
              <span className="text-secondary mx-2 font-bold">{email}</span>
              <span className="text-paragraph">(سيصلك خلال 60 ثانية)</span>
            </div>
          )}
        </div>
      }
    >
      <VerificationForm email={email} />
    </AuthLayout>
  );
};