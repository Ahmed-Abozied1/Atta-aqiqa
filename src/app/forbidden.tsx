import { AppButton } from "@/components/common/AppButton";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-bg">
      <div className="max-w-lg w-full text-center p-6 md:p-8">
        <div className="mb-10">
          <h1 className="heading-5-bold md:heading-3-bold text-title mb-4">
            عذراً، لا تملك الصلاحية
          </h1>
          <p className="text-regular-normal md:text-regular-medium text-paragraph">
            يبدو أنك تحاول الوصول إلى قسم غير مخصص لحسابك الحالي. يرجى العودة للرئيسية أو التواصل مع الإدارة.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <AppButton appVariant="secondary">
            <Link href="/">
              العودة للرئيسية
            </Link>
          </AppButton>
        </div>
      </div>
    </main>
  );
}