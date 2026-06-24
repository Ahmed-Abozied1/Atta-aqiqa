"use client";

import { Cancel } from "@/components/ui/icons/Cancel";
import { Menu } from "@/components/ui/icons/Menu";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    activeLink: string;
    onSelect: (name: string) => void;
}

export const DrawerMenu = ({ isOpen, onClose, activeLink, onSelect }: Props) => {
    const pathname = usePathname();

    const handleClick = (name: string) => {
        onSelect(name);
        onClose();
    };
    const isRestrictedPage =
        pathname.includes("product") || pathname.includes("profile");

    const filteredLinks = NAV_LINKS.filter((link) => {
        if (!isRestrictedPage) return true;

        return (
            link.name !== "الأسئلة الشائعة" &&
            link.name !== "آراء العملاء"
        );
    });
    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent
                side="right"
                className="w-full max-w-75 bg-bg p-4 rounded-tl-2xl rounded-bl-2xl shadow-2xl border-none"
            >
                <div className="flex items-center justify-between p-2.75 border-b border-border">
                    <div className="flex items-center gap-2.5">
                        <Menu className="text-primary" />
                        <span className="heading-6 text-primary font-bold">القائمة</span>
                    </div>
                    <button onClick={onClose} aria-label="close" className="cursor-pointer">
                        <Cancel className="w-6 h-6" />
                    </button>
                </div>

               <ul className="mt-4">
  {filteredLinks.map((link) => (
    <li key={link.name}>
      {link.isExternal ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(link.name)}
          className={`block px-2 py-3 rounded-xl ${
            activeLink === link.name
              ? "bg-[#F3F8F5] text-primary font-bold"
              : "text-title hover:bg-primary/10"
          }`}
        >
          {link.name}
        </a>
      ) : (
        <Link
          href={link.href}
          onClick={() => handleClick(link.name)}
          className={`block px-2 py-3 rounded-xl ${
            activeLink === link.name
              ? "bg-[#F3F8F5] text-primary font-bold"
              : "text-title hover:bg-primary/10" 
          }`}
        >
          {link.name}
        </Link>
      )}
    </li>
  ))}
</ul>
            </SheetContent>
        </Sheet>
    );
};