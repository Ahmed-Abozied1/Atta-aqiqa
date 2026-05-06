import ContentPage from '@/components/common/ContentPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'من نحن | عطاء ',
};

export default function AboutPage() {
  const pClass =
    "text-paragraph text-regular-normal md:text-regular-medium";

  return (
    <ContentPage title="من نحن">
      <div className="space-y-8">

        <p className={pClass}>
          نحن{" "}
          <span className="text-primary text-medium-medium md:text-medium-bold">
            مزرعة عطاء
          </span>
          ، كيان مصري يعمل بشكل رسمي ومقيد بالسجل التجاري ويحمل بطاقة ضريبية،
          ومتخصص في تربية وتجارة المواشي وتنفيذ الذبائح بمختلف أنواعها.
        </p>

        <p className={pClass}>
          نقدّم خدماتنا من خلال منظومة متكاملة تهدف إلى توفير تجربة سهلة وموثوقة
          لعملائنا، مع الالتزام بأعلى معايير الجودة والشفافية.
        </p>

        <p className={pClass}>
          نوفر لعملائنا إمكانية اختيار الذبيحة من بين مجموعة متنوعة من المواشي،
          تشمل:
        </p>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {['أبقار', 'عجول', 'خراف', 'ماعز'].map((item) => (
            <li
              key={item}
              className="bg-card border border-border rounded-xl py-3 text-medium-medium hover:bg-secondary/10 hover:scale-[1.02] transition-all duration-200"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition">
          <p className="text-primary text-medium-bold mb-3">
            نشرف على جميع مراحل التنفيذ باحترافية عالية:
          </p>

          <p className={pClass}>
            بدءًا من اختيار المواشي بعناية، مرورًا بعملية الذبح وفق الضوابط
            الشرعية، وحتى تجهيز وتسليم الطلب، بما يضمن راحة العميل وثقته في
            الخدمة المقدمة.
          </p>
        </div>

        <p className={pClass}>
          ومن خلال هذا النموذج المتكامل، نسعى لتقديم حل عملي يجمع بين السهولة
          والموثوقية، مع رؤية حديثة تعتمد على التطوير المستمر وتقديم تجربة
          متميزة تلبي تطلعات عملائنا.
        </p>

      </div>
    </ContentPage>
  );
}