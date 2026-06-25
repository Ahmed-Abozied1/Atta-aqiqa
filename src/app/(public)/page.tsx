import type { Metadata } from "next";
import Home from "@/features/home/components";
import { OrganizationSchema } from "@/components/common/OrganizationSchema";

export const metadata: Metadata = {
  title: "عطاء | أضاحي وعقيقة موثوقة في أفريقيا ومصر",
  description:
    "مزرعة عطاء تنفذ ذبائح الأضحية والعقيقة والصدقة بأسعار مناسبة داخل مصر وفي أفريقيا للمسلمين. أكثر من 10,000 عملية حجز ونسبة رضا 99%.",
  alternates: { canonical: "https://www.ataa-aqiqa.com" },
};

export default function page() {
  return (
    <>
      <OrganizationSchema />
      <Home />
    </>
  );
}
