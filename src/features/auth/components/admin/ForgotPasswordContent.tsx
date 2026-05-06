import { AdminAuthLayout } from "./AdminAuthLayout";
import { ForgotPasswordForm } from "../../forms/ForgotPasswordForm";

export const ForgotPasswordContent = () => {
        return (
                <AdminAuthLayout
                        title="نسيت كلمة المرور؟"
                        description="أدخل بريدك الإلكتروني المسجل وسنرسل لك رمز تحقق لإعادة تعيين كلمة المرور." >
                        <ForgotPasswordForm role="ADMIN"/>
                </AdminAuthLayout>
        )
}
