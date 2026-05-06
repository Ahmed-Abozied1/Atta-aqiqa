"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg overflow-x-hidden">
      <Sidebar className="hidden md:flex lg:w-64" user={user} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={user}>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Menu className="size-6 text-title cursor-pointer" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="p-0 overflow-hidden w-70 max-w-[80vw] border-card!"
            >
              <Sidebar user={user} />
            </SheetContent>
          </Sheet>
        </Topbar>

        <main className="bg-card p-4 md:p-8 flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}