import ContentPage from '@/components/common/ContentPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دليلك لاختيار الأضحية والعقيقة |  عطاء',
};

export default function GuidePage() {
  const pClass = "text-paragraph text-regular-normal md:text-regular-medium leading-7";
  const sectionTitle = "text-title text-medium-bold md:text-large-bold";

  return (
    <ContentPage title="دليلك لاختيار الأضحية والعقيقة">
      <div className="space-y-10">

        <p className={pClass}>
          في <span className="text-primary font-bold"> مزرعة عطاء</span>، نوفر لكم ذبائح موثوقة يتم تنفيذها داخل دول أفريقيا لصالح المسلمين المستحقين، مع إمكانية اختيار نوع الذبيحة حسب الغرض (أضحية – عقيقة – نذر – كفارة)، وذلك بسهولة من خلال موقعنا الإلكتروني.
        </p>

        <p className={pClass}>
          ويهدف هذا الدليل إلى مساعدتكم في اختيار الذبيحة الأنسب لاحتياجكم بكل وضوح وسهولة.
        </p>

        <div className="space-y-6">
          <h3 className={sectionTitle}>أولاً: اختيار الأضحية</h3>
          <p className={pClass}>(جميع الذبائح لدينا مستوفية للشروط الشرعية)</p>

          <ul className="list-disc list-inside space-y-2">
            <li className={pClass}>أن تكون من بهيمة الأنعام (بقر – غنم – إبل).</li>
            <li className={pClass}>
              أن تبلغ السن الشرعي:
              <ul className="list-inside list-decimal ml-4 mt-1 space-y-1">
                <li>البقرة / العجل: سنتان فأكثر</li>
                <li>الماعز: سنة فأكثر</li>
                <li>الخراف: 6 أشهر فأكثر</li>
              </ul>
            </li>
            <li className={pClass}>أن تكون سليمة من العيوب الظاهرة.</li>
            <li className={pClass}>وقت الذبح: يبدأ من بعد صلاة عيد الأضحى وحتى غروب شمس اليوم الثالث عشر من ذي الحجة.</li>
          </ul>

          <h4 className="text-medium-bold md:text-large-bold mt-4">أنواع الأضاحي المتوفرة</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {[
              { name: "البقرة", people: "7 أشخاص", meals: "200–250 فرد وجبات" },
              { name: "العجل", people: "7 أشخاص", meals: "250–300 فرد" },
              { name: "الخروف", people: "شخص واحد", meals: "25–30 فرد" },
              { name: "الماعز", people: "شخص واحد", meals: "15–20 فرد وجبات" },
            ].map((item) => (
              <div key={item.name} className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
                <p className="text-medium-bold text-primary">{item.name}</p>
                <p className={pClass}>يجزئ عن: {item.people}</p>
                <p className={pClass}>عدد المستفيدين التقريبي: {item.meals}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className={sectionTitle}>ثانيًا: اختيار العقيقة</h3>
          <p className={pClass}>تخضع العقيقة لنفس شروط الأضحية من حيث السلامة والعمر الشرعي.</p>

          <ul className="list-disc list-inside space-y-2">
            <li className={pClass}>عن المولود الذكر: شاتان (2 ماعز أو خروفان)</li>
            <li className={pClass}>عن المولودة الأنثى: شاة واحدة (ماعز أو خروف)</li>
          </ul>

          <h4 className="text-medium-bold md:text-large-bold mt-4">أنواع العقيقة</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {[
              { name: "الماعز", female: "مولودة أنثى: ماعز واحد", male: "مولود ذكر: 2 ماعز (نصف عقيقة لكل تيس)" },
              { name: "الخروف", female: "مولودة أنثى: واحد", male: "مولود ذكر: اثنان" },
            ].map((item) => (
              <div key={item.name} className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
                <p className="text-medium-bold text-primary">{item.name}</p>
                <p className={pClass}>{item.female}</p>
                <p className={pClass}>{item.male}</p>
              </div>
            ))}
          </div>

          <p className={pClass}>
            يجوز استخدام البقرة أو العجل في العقيقة، ولكن المستحب والأفضل أن تكون العقيقة من الغنم (ماعز أو خروف)، وهو الأقرب لهدي النبي ﷺ.
          </p>

          <h4 className="text-medium-bold md:text-large-bold mt-4">ملاحظات مهمة</h4>
          <ul className="list-disc list-inside space-y-2">
            <li className={pClass}>يتم تنفيذ جميع الذبائح داخل دول أفريقيا لصالح المسلمين المستحقين.</li>
            <li className={pClass}>تتم العملية تحت إشراف كامل، ووفق الضوابط الشرعية.</li>
            <li className={pClass}>يمكن توثيق الذبح بالصور أو الفيديو حسب طلب العميل.</li>
          </ul>
        </div>

      </div>
    </ContentPage>
  );
}