// app/admin/profile/page.tsx
import ProfileSettings from "@/features/profile/admin/components/ProfileSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الملف الشخصي | لوحة التحكم",
  description: "إدارة معلومات حسابك الشخصي وكلمة المرور",
};

export default function ProfilePage() {
  return <ProfileSettings />;
}