import { AdminAuthLayout } from "./AdminAuthLayout";
import { ResetPasswordForm } from "../../forms/ResetPasswordForm";

export const ResetPasswordContent = ({ token }: { token?: string }) => {
    return (
        <AdminAuthLayout
            title="إعادة تعيين كلمة المرور"
            description="يرجى إدخال كلمة مرور جديدة لحسابك." >
            <ResetPasswordForm token={token} role="ADMIN" />
        </AdminAuthLayout>
    );
};