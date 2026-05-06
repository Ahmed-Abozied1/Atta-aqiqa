"use client";

import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  activeLink: string;
  onLinkClick: (name: string) => void;
}

export const NavLinks = ({ activeLink, onLinkClick }: NavLinksProps) => {
  const pathname = usePathname();

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
    <>
      {filteredLinks.map((link) => (
        <li key={link.name}>
          {link.isExternal ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-regular-normal md:text-regular-medium lg:text-medium-normal p-2 hover:text-secondary ${
                activeLink === link.name
                  ? "text-secondary font-bold"
                  : "text-white"
              }`}
              onClick={() => onLinkClick(link.name)}
            >
              {link.name}
            </a>
          ) : (
            <Link
              href={link.href}
              className={`text-regular-normal md:text-regular-medium lg:text-medium-normal p-2 hover:text-secondary ${
                activeLink === link.name
                  ? "text-secondary font-bold"
                  : "text-white"
              }`}
              onClick={() => onLinkClick(link.name)}
            >
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </>
  );
};