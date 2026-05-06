import { Accordion } from "@/components/ui/accordion";
import ContentPage from '@/components/common/ContentPage';
import { FAQItem } from "@/features/home/components/FAQ/FAQItem";
import { FAQ_DATA } from "@/features/home/constants/faq-data";
import { Metadata } from "next";
export const metadata:Metadata = {
  title: "الأسئلة الشائعة | عطاء",
};

export default function FAQPage() {
  const pClass =
    "text-paragraph text-regular-normal md:text-regular-medium";

  return (
    <ContentPage title="الاسئله الشائعه">
    <Accordion
            type="multiple"
            defaultValue={["fq-1", "fq-2"]}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10"
        >
            {FAQ_DATA.map((item) => (
                <FAQItem key={item.id} item={item} />
            ))}
        </Accordion>
    </ContentPage>
  );
}