import { DashboardLayout } from "@/components/layout/Dashboard";
import { getServerSession } from "@/lib/get-session";
import { canAccessDashboard } from "@/lib/roles";
import { unauthorized, forbidden } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return unauthorized();
  if (!canAccessDashboard(user.role)) return forbidden();

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
};

export default AdminLayout;