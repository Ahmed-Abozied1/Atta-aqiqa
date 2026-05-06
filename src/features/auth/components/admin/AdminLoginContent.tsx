import LoginForm from "@/features/auth/forms/LoginForm";
import { AdminAuthLayout } from "./AdminAuthLayout";

export const AdminLoginContent = () => {
    return (
        <AdminAuthLayout
            title="تسجيل الدخول"
            description="أدخل بياناتك للوصول إلى لوحة التحكم."
        >      <LoginForm role="ADMIN" />
        </AdminAuthLayout>
    )
}
