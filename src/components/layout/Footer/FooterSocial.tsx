import { SOCIAL_LINKS } from "@/lib/constants";
import Link from "next/link";

export const FooterSocial = () => {
  return (
    <div className="flex gap-3 justify-center md:justify-start mt-4">
      {SOCIAL_LINKS.map((item, index) => {
        const Icon = item.icon;

        return (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-secondary hover:text-secondary! transition"
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};