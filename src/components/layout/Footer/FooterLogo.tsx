import Image from "next/image";
import Link from "next/link";

export const FooterLogo = () => {
    return (
        <Link href="/" className="mb-4 md:mb-6 block ">
            <Image
                src="/images/logo.svg"
                alt="عطاء"
                width={48}
                height={48}
                className="w-[45.6px] md:w-[62.7px] h-16 md:h-22 m-auto"
            />
        </Link>
    );
};