"use client";

import { useRouter } from "next/navigation";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "./ProfileHeader";
import { useProfileStore } from "@/store/profileStore";
import { Skeleton } from "@/components/ui/skeleton";
import { AppButton } from "@/components/common/AppButton";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface ProfileSidebarProps {
  name: string;
}

export const ProfileSidebar = ({ name }: ProfileSidebarProps) => {
  const router = useRouter();
  const { user, isLoading } = useProfileStore();

 const { setUser } = useProfileStore();

const handleSignOut = async () => {
  try {
    const { error } = await authClient.signOut();

    if (!error) {
      setUser(null); // 👈 مهم جداً

      toast.success("تم تسجيل الخروج بنجاح");

      router.push("/");
      router.refresh(); // 👈 عشان يعمل re-render للصفحة
    } else {
      toast.error("حدث خطأ أثناء تسجيل الخروج");
    }
  } catch (error) {
    toast.error("حدث خطأ أثناء تسجيل الخروج");
  }
};

  if (isLoading && !user) {
    return (
      <aside className="w-full md:w-74 md:flex-none">
        <div className="bg-bg p-0 md:p-6 sticky top-10 md:h-full flex flex-col md:shadow-[0px_8px_16px_0px_#02080F14]! rounded-2xl">
          <div className="flex flex-col items-center text-center">
            <Skeleton className="w-24 h-24 rounded-full mb-4" />
            <Skeleton className="h-7 w-32 mb-4 md:mb-6" />
          </div>
          <div className="flex flex-row md:flex-col mt-2 gap-2 w-full">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* زر وهمي في الأسفل أثناء التحميل */}
          <Skeleton className="h-10 w-full rounded-lg mt-auto" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-74 md:flex-none">
      <div className="bg-bg p-0 md:p-6 sticky top-10 md:h-full flex flex-col md:shadow-[0px_8px_16px_0px_#02080F14]! rounded-2xl">
        <ProfileHeader name={name} />

        <TabsList className="flex flex-row md:flex-col mt-2 bg-transparent p-0 gap-2 w-full">
          <TabsTrigger value="details" className="tabs-trigger">
            بيانات الحساب
          </TabsTrigger>
          <TabsTrigger value="password" className="tabs-trigger">
            كلمة المرور
          </TabsTrigger>
        </TabsList>

        <AppButton onClick={handleSignOut} className="w-full mt-2 md:mt-auto bg-bg! border border-primary! text-primary hover:text-white">
          تسجيل الخروج
        </AppButton>
      </div>
    </aside>
  );
};