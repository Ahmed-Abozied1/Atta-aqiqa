import Link from "next/link";
import { FOOTER_LINK1, FOOTER_LINK2 } from "@/lib/constants";

export const FooterNav = () => {
  return (
    <div className="text-center md:text-right">
      <h3 className="text-medium-bold md:text-large-medium mb-6">
        روابط مهمة
      </h3>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          {FOOTER_LINK1.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-secondary transition">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {FOOTER_LINK2.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-secondary transition">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};