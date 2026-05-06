import ContentPage from '@/components/common/ContentPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية |  عطاء',
};

export default function PrivacyPage() {
  const pClass =
    "text-paragraph text-regular-normal md:text-regular-medium leading-7";

  const sectionTitle =
    "text-title text-medium-bold md:text-large-bold";

  return (
    <ContentPage title="سياسة الخصوصية">
      <div className="space-y-10">

        <div className="space-y-4">
          <h3 className={sectionTitle}>حماية البيانات</h3>

          <p className={pClass}>
            نولي في{" "}
            <span className="text-primary font-bold">مزرعة عطاءة</span>{" "}
            أهمية قصوى لخصوصية وأمان بيانات عملائنا، ونؤكد أننا لا نقوم بمشاركة أو بيع أي معلومات شخصية لأي طرف ثالث.
          </p>

          <p className={pClass}>
            عند قيامك بتقديم بياناتك الشخصية عبر موقعنا، نلتزم بحمايتها سواء أثناء نقلها عبر الإنترنت أو بعد تخزينها داخل أنظمتنا.
          </p>

          <p className={pClass}>
            نستخدم مجموعة متنوعة من الوسائل والتقنيات الأمنية لحماية بياناتك من الوصول أو الاستخدام أو الإفصاح غير المصرح به، ويتم تخزين المعلومات على أنظمة آمنة ذات صلاحيات محدودة، كما يتم تدريب فريق العمل بشكل مستمر على أفضل ممارسات حماية البيانات.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>خصوصية الدفع</h3>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
            <p className={pClass}>
              جميع عمليات الدفع التي تتم من خلال{" "}
              <span className="text-primary font-bold">مزرعة عطاءة</span>{" "}
              تتم عبر وسائل دفع آمنة ومعتمدة (مثل التحويلات البنكية أو المحافظ الإلكترونية).
            </p>

            <p className={pClass}>
              لا نقوم بتخزين أي بيانات بنكية أو معلومات حساسة خاصة ببطاقات الدفع داخل الموقع.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>خصوصية الحساب</h3>

          <ul className="space-y-3">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <p className={pClass}>
                أنت المسؤول بشكل كامل عن الحفاظ على سرية بيانات حسابك وكلمة المرور الخاصة بك، وكذلك عن جميع الأنشطة التي تتم من خلال حسابك.
              </p>
            </li>

            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <p className={pClass}>
                في حال كان عمرك أقل من 18 عامًا، يجب استخدام الموقع تحت إشراف أحد الوالدين أو ولي الأمر.
              </p>
            </li>

            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <p className={pClass}>
                نحتفظ بحقنا في رفض تقديم الخدمة، أو إيقاف الحسابات، أو تعديل أو حذف أي محتوى، أو إلغاء الطلبات وفقًا لما نراه مناسبًا.
              </p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>طبيعة الاتفاق والعمل</h3>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <p className={pClass}>
              بإتمامك عملية الشراء من{" "}
              <span className="text-primary font-bold">مزرعة عطاءة</span>{" "}
              فإنك تفوضنا بتنفيذ طلب الذبيحة نيابةً عنك، وفق الضوابط الشرعية والمعايير المتبعة في دول قارة أفريقيا.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>مكان التوريد والتنفيذ</h3>

          <p className={pClass}>
            يتم تنفيذ الذبائح في دول قارة أفريقيا، وفق الإجراءات الصحية والشرعية المعتمدة، وقد يتم توزيع اللحوم أو تنفيذ الصدقات حسب طبيعة الطلب المتفق عليه.
          </p>
        </div>

      </div>
    </ContentPage>
  );
}