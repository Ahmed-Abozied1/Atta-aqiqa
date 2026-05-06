import { SectionHeader } from "@/components/common/SectionHeader";
import { FAQList } from "./FAQList";

export const FAQ = () => {
    return (
        <section className="py-10 md:py-16 container" id="faq">
            <SectionHeader
                badge="الأسئلة الشائعة"
                title="ما تريد معرفته عن مزرعة عطاء"
                description="إذا لم تجد ما تريد، تواصل معنا مباشرة"
            />
            <FAQList />
        </section>
    );
};