"use client";

import { AppButton } from "@/components/common/AppButton";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-bg">
      <div className="max-w-lg w-full text-center p-6 md:p-8">
        
        <div className="mb-10">
          <h1 className="heading-5-bold md:heading-3-bold text-title mb-4">
            عذراً، غير مصرح بالدخول
          </h1>
          <p className="text-regular-normal md:text-regular-medium text-paragraph">
            يرجى تسجيل الدخول للمتابعة والوصول إلى هذه الصفحة.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full justify-center items-center">
           <AppButton
            appVariant="secondary" asChild          >
            <Link href="/admin/login">
            تسجيل الدخول
            </Link>  
          </AppButton> 
        </div>

      </div>
    </main>
  );
}