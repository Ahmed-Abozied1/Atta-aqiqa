// components/layout/admin/Topbar.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { ChevronDown } from "lucide-react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

const Topbar = ({ children, user }: { children?: React.ReactNode; user: User }) => {
  const router = useRouter();
  const { user: profileUser } = useProfileStore();
  const displayUser = profileUser || user;
  
  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (!error) {
      router.push("/admin/login");
    }
  }
  
  return (
    <header className="bg-bg border-b border-border flex items-center justify-between py-3.5 px-4 md:px-6">
      <div className="flex flex-row gap-2 md:gap-0 md:flex-col">
        <div className="md:hidden">
          {children}
        </div>
        <h2 className="text-regular-bold md:heading-5-bold text-title">
          مرحباً، {displayUser.name?.split(" ")[0]}
        </h2>
        <p className="text-regular-normal text-paragraph hidden md:block">
          يمكنك هنا متابعة أداء المنصة وإدارة المستخدمين بسهولة.
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-4 cursor-pointer">
            <Avatar className="h-10 md:h-14 w-10 md:w-14">
              <AvatarImage src={displayUser.image || undefined} alt={displayUser.name} />
              <AvatarFallback className="bg-secondary text-bg! text-medium-semibold md:heading-5-semibold">
                {displayUser.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="hidden md:flex flex-col">
              <span className="text-medium-bold text-title">
                {displayUser.name?.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="text-regular-normal text-paragraph">
                {displayUser.role === "ADMIN" && "الأدمن"}
              </span>
            </div>

            <span className="hidden md:block">
              <ChevronDown className="size-4" />
            </span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 p-2 bg-bg border border-border shadow-[0px_8px_24px_0px_#02080F14]! rounded-xl">
          <DropdownMenuItem asChild className="outline-none">
            <Link 
              href="/admin/profile" 
              className="flex items-center justify-end! gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-title text-regular-medium hover:bg-gray-50 focus:bg-gray-50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              الملف الشخصي
            </Link>
          </DropdownMenuItem>

          <div className="h-px bg-border my-1" />

          <DropdownMenuItem 
            className="flex items-center gap-2 justify-end! px-3 py-2.5 cursor-pointer rounded-lg text-red-500 text-regular-medium hover:bg-red-50 focus:bg-red-50 transition-colors outline-none"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Topbar;