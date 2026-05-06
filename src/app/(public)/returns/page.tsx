import ContentPage from '@/components/common/ContentPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الاسترجاع |  عطاء',
};

export default function ReturnsPage() {
  const pClass =
    "text-paragraph text-regular-normal md:text-regular-medium leading-7";

  const sectionTitle =
    "text-title text-medium-bold md:text-large-bold";

  return (
    <ContentPage title="سياسة الاسترجاع">
      <div className="space-y-10">

        <div className="space-y-4">
          <h3 className={sectionTitle}>مقدمة</h3>
          <p className={pClass}>
            نشكركم على ثقتكم في{" "}
            <span className="text-primary font-bold">مزرعة عطاء</span>، 
            ويسعدنا دائمًا أن نكون عند حسن ظنكم ونقدم لكم أفضل خدمة ممكنة.
          </p>
          <p className={pClass}>
            ندرك أنه في بعض الأحيان قد يرغب العميل في تعديل قراره بعد إتمام عملية الشراء، لذلك نحرص على توفير سياسة استرجاع مرنة وسهلة وفقًا للشروط التالية:
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>1- طلب الاسترجاع</h3>
          <ul className="list-disc list-inside space-y-2">
            <li className={pClass}>
              يمكنكم طلب استرجاع المبلغ خلال مدة لا تتجاوز 24 ساعة من وقت إتمام عملية الدفع.
            </li>
            <li className={pClass}>
              يتم تقديم طلب الاسترجاع من خلال التواصل مع خدمة العملاء عبر الواتساب.
            </li>
            <li className={pClass}>
              يتم إعادة المبلغ إلى نفس وسيلة الدفع المستخدمة خلال مدة أقصاها 5 أيام عمل من تاريخ تأكيد الطلب.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>2- تعديل البيانات</h3>
          <ul className="list-disc list-inside space-y-2">
            <li className={pClass}>
              لا يمكن تعديل الاسم المرتبط بالطلب (مثل اسم صاحب الذبيحة أو النية) بعد إتمام عملية الدفع.
            </li>
            <li className={pClass}>
              لا يمكن تعديل تفاصيل الطلب الأساسية بعد تأكيده.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>3- طبيعة التنفيذ</h3>
          <ul className="list-disc list-inside space-y-2">
            <li className={pClass}>
              يتم تنفيذ الطلبات (الذبائح والصدقات) نيابةً عن العملاء داخل دول أفريقيا، لصالح المسلمين المستحقين، وذلك وفق الضوابط الشرعية والإجراءات المتبعة.
            </li>
            <li className={pClass}>
              وبناءً على ذلك، لا يمكن إلغاء أو استرجاع الطلب بعد بدء التنفيذ الفعلي.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>4- التوريد والتوزيع</h3>
          <p className={pClass}>
            تتم عملية الذبح والتوزيع داخل دول أفريقيا، ويتم إيصال اللحوم أو تنفيذ الصدقات وفق طبيعة الطلب المتفق عليه.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitle}>خدمة العملاء</h3>
          <p className={pClass}>
            نسعى دائمًا لتقديم تجربة موثوقة وسلسة لعملائنا، وفي حال وجود أي استفسار يسعد فريق خدمة العملاء مساعدتكم في أي وقت.
          </p>
        </div>

      </div>
    </ContentPage>
  );
}