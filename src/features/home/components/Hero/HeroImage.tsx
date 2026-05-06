import Image from "next/image";
export const HeroImage = () => {
    return (
        <>
            <Image
                src="/images/home/hero-bg.webp"
                alt="خلفية الصفحة الرئيسية"
                fill
                priority
                className="object-cover object-left hidden md:block"
            />

            <Image
                src="/images/home/hero-sm-bg.webp"
                alt="خلفية الصفحة الرئيسية"
                fill
                priority
                className="object-cover block md:hidden"
            />

        </>
    );
};