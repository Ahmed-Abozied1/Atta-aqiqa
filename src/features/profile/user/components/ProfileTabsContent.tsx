"use client";

import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";
import { AccountForm } from "./AccountForm";
import { PasswordForm } from "./PasswordForm";
import { TabsContent } from "@/components/ui/tabs";

export const ProfileTabsContent = () => {
  return (
    <div className="flex-1 min-w-0">
      <div className="hidden md:block mb-8">
        <AppBreadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حسابي" }]} />
      </div>
      <TabsContent value="details">
        <AccountForm />
      </TabsContent>
      <TabsContent value="password">
        <PasswordForm />
      </TabsContent>
    </div>
  );
};