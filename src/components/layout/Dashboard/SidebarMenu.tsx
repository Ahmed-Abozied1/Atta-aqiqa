"use client";

import { MENU_ITEMS } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const SidebarMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="flex-1 p-4">
      {MENU_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-colors h-12",
                isActive ? "bg-[#F3F8F5]" : "hover:bg-[#F3F8F5]"
              )}
            >
              <Icon
                className={`
                  "w-5 h-5"
                  ${isActive ? "text-primary" : "text-title"}
                `}
              />
              <div className={` ${isActive ? "text-primary text-regular-medium" : "text-regular-normal text-title"}`}>
                {item.name}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};