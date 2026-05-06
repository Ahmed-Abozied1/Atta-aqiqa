import { Metadata } from "next";
import AdminProducts from "@/features/admin-products/components/AdminProducts";

export const metadata: Metadata = {
  title: "إدارة المنتجات | لوحة التحكم",
};

export default function Page() {
  return <AdminProducts />;
}