import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppButton } from "@/components/common/AppButton";
import { Star } from "@/components/ui/icons/Star";
import { ProductCardProps } from "@/features/home/types";

export const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  beneficiaries,
  price,
  rating = 0,
  imageUrl,
  slug,
}) => {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]! bg-[#FDFDFD]">
      {/* Image: compact on mobile, original on desktop */}
      <div className="relative h-36 md:h-60">
        <Image
          src={imageUrl || ""}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      <div className="px-3 md:px-4 pt-2 md:pt-3">
        {/* Mobile: badge + rating on same row | Desktop: badge alone */}
        <div className="flex items-center justify-between md:block">
          <span className="bg-[#E9F7EF] text-success text-xs font-bold px-2.5 py-1 rounded-full md:h-8 md:text-small-bold md:px-4 md:py-2 md:flex md:items-center md:w-fit">
            {beneficiaries}
          </span>
          {rating > 0 && (
            <div className="flex items-center gap-0.5 md:hidden">
              <Star className="w-3.5 h-3.5 fill-rating text-rating" />
              <span className="text-xs font-medium text-title">{rating}</span>
            </div>
          )}
        </div>

        {/* Name + rating (desktop shows rating here, mobile already showed it above) */}
        <div className="flex justify-between gap-4 items-center mt-1.5 md:mt-2 mb-1.5 md:mb-2">
          <h3 className="text-sm font-bold md:heading-5-bold">{name}</h3>
          {rating > 0 && (
            <div className="hidden md:flex items-center gap-0.75">
              <Star className="w-4.5 h-4.5 fill-rating text-rating" />
              <span className="text-regular-medium text-title">{rating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border mb-1.5 md:mb-2" />

      <div className="flex items-center justify-between px-3 md:px-4 mb-3 md:mb-4 gap-2">
        <div className="flex items-baseline gap-0.5 md:gap-0.75 font-bold text-primary text-sm md:text-large-bold">
          <span>{price}</span>
          <span className="text-xs md:text-base">ج.م</span>
        </div>
        <AppButton
          asChild
          appVariant="secondary"
          className="text-xs! px-3! h-8! md:text-regular-medium! md:px-4! md:h-12!"
        >
          <Link href={`/product/${slug || id}`}>أحجز الآن</Link>
        </AppButton>
      </div>
    </div>
  );
};