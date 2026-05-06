"use client";

import { SidebarMenu } from "./SidebarMenu";
import Link from "next/link";
import { getInitials } from "@/lib/getInitials";
import { useProfileStore } from "@/store/profileStore";
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar";
import { AtaaLogo } from "@/components/ui/icons/AtaaLogo";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

const Sidebar = ({ className, user }: { className?: string; user: User }) => {
  const { user: profileUser } = useProfileStore();
  const displayUser = profileUser || user;
  
  return (
    <aside className={`relative bg-bg flex flex-col h-full md:h-auto border-l border-transparent md:border-card ${className}`}>
      <div>
        <div className="flex justify-center items-center py-6">
          <AtaaLogo width={68} height={96} />
        </div>

        <SidebarMenu />
      </div>

      <Link href="/admin/profile">
        <div className="absolute bottom-0 w-full p-4 border-t border-border flex gap-4 items-center bg-bg cursor-pointer hover:bg-gray-50 transition-colors">
          <Avatar className="h-12 w-12">
            <AvatarImage src={displayUser.image || undefined} alt={displayUser.name} />
            <AvatarFallback className="bg-secondary text-bg heading-5-semibold">
              {getInitials(displayUser.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col overflow-hidden">
            <span className="text-medium-bold text-title truncate">
              {displayUser.name.split(" ").slice(0, 2).join(" ")}
            </span>
            <span className="text-small-normal text-paragraph">
              {displayUser.role === "ADMIN" && "الأدمن"}
            </span>
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;