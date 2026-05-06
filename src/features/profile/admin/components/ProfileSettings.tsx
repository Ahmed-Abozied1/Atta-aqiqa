// features/profile/admin/components/ProfileSettings.tsx
"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { PasswordForm } from "./PasswordForm";
import { AccountInfoForm } from "./AccountInfoForm";
import ProfileTabs from "./ProfileTabs";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");

  return (
    <div className="bg-card min-h-screen space-y-6 md:space-y-8 flex flex-col">
      <div className="text-title gap-4 heading-4-bold hidden md:flex items-center">
        <ArrowLeft className="size-8" />
        <h2 className="heading-4-bold">الملف الشخصي</h2>
      </div>

      <ProfileHeader />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="md:bg-bg md:rounded-2xl md:p-6 md:border border-card flex flex-col flex-1">
        {activeTab === "info" ? <AccountInfoForm /> : <PasswordForm />}
      </main>
    </div>
  );
};

export default ProfileSettings;