"use client";

import { useState, useCallback, useEffect } from "react";
import { Session, User } from "@/lib/auth";
import { useResetPasswordToken } from "@/hooks/useResetPasswordToken";
import { Menu } from "@/components/ui/icons/Menu";
import { NavbarLogo } from "./NavbarLogo";
import { NavLinks } from "./NavLinks";
import { NavbarUser } from "./NavbarUser";
import { DrawerMenu } from "./DrawerMenu";
import { usePathname } from "next/navigation";

interface Props {
  session: { session: Session; user: User } | null;
}

export const NavbarContent = ({ session }: Props) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const user = session?.user || null;
  const [drawer, setDrawer] = useState(false);
  const [active, setActive] = useState("الرئيسية");
  const [scrolled, setScrolled] = useState(false);

  useResetPasswordToken();

  const handleLink = useCallback((name: string) => setActive(name), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[50] transition-all duration-300 ${
        isHome
          ? scrolled
            ? "bg-primary"
            : "bg-transparent"
          : "bg-primary"
      }`}
    >
      <div className="container flex items-center h-20">

        {/* LOGO */}
        <div className="flex-1 flex justify-center order-2 md:order-1 md:flex-none md:justify-start">
          <NavbarLogo />
        </div>

        {/* LEFT (links + menu) */}
        <div className="flex-1 flex items-center order-1 md:order-2">
          <button
            onClick={() => setDrawer(true)}
            aria-label="فتح القائمة"
            className="md:hidden cursor-pointer"
          >
            <Menu className="text-bg" />
          </button>

          <ul className="hidden md:flex gap-2 lg:ml-12">
            <NavLinks activeLink={active} onLinkClick={handleLink} />
          </ul>
        </div>

        {/* RIGHT (user) */}
        <div className="flex-1 flex justify-end order-3 md:order-3 md:flex-none md:ml-auto">
          <NavbarUser user={user} />
        </div>

      </div>

      <DrawerMenu
        isOpen={drawer}
        onClose={() => setDrawer(false)}
        activeLink={active}
        onSelect={handleLink}
      />
    </nav>
  );
};