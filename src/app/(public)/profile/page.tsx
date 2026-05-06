import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
import { ProfileSidebar } from "@/features/profile/user/components/ProfileSidebar";
import { ProfileTabsContent } from "@/features/profile/user/components/ProfileTabsContent";
import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";

export default async function Page() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user || user.role !== "USER") {
    unauthorized();
  }
  
  return (
    <main className="container py-10 bg-bg mt-20">
      <div className="block md:hidden mb-4">
        <AppBreadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حسابي" }]} />
      </div>
      <div>
        <Tabs defaultValue="details" dir="rtl">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <ProfileSidebar name={user.name || "User"} />
            <ProfileTabsContent />
          </div>
        </Tabs>
      </div>
    </main>
  );
}