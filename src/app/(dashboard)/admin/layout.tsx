import { DashboardLayout } from "@/components/layout/Dashboard";
import { getServerSession } from "@/lib/get-session";
import { unauthorized, forbidden } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return unauthorized();
  if (user.role !== "ADMIN") return forbidden();

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
};

export default AdminLayout;