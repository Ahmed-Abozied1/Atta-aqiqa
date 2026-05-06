import Image from "next/image";
import Link from "next/link";

export const NavbarLogo = () => (
    <Link href="/">
        <Image
            src="/images/logo.svg"
            alt="عطاء"
            width={45}
            height={48}
            className="w-[2.138rem] md:w-[2.85rem] h-12 block"
        />
    </Link>
);