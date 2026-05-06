import Image from "next/image";

export const StatImage = () => {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/home/stats-bg.webp"
        alt="خلفية قسم الإحصائيات"
        fill
        priority
        className="hidden md:block object-cover object-right"
      />

      <Image
        src="/images/home/stats-sm-bg.webp"
        alt="خلفية قسم الإحصائيات"
        width={500}
        height={772}
        className="block md:hidden object-cover object-center w-full"
      />

    </div>
  );
};