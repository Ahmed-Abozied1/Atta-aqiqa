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
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] bg-[#FDFDFD] w-full">
      {/* Image */}
      <div className="relative h-36 md:h-52 bg-gray-50/60">
        <Image
          src={imageUrl || ""}
          alt={name}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Content */}
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-2">
        {/* Badge + Rating */}
        <div className="flex items-center justify-between gap-1">
          <span className="bg-[#E9F7EF] text-success text-xs font-bold px-2.5 py-1 rounded-full">
            {beneficiaries}
          </span>
          {rating > 0 && (
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-rating text-rating" />
              <span className="text-xs font-medium text-title">{rating}</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold md:text-base text-title leading-tight">{name}</h3>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Price + Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-0.5 font-bold text-primary text-sm md:text-base">
            <span>{price}</span>
            <span className="text-xs font-medium">ج.م</span>
          </div>
          <AppButton
            asChild
            appVariant="secondary"
            className="text-xs! px-3! h-8! md:h-10! md:px-4! md:text-sm!"
          >
            <Link href={`/product/${slug || id}`}>أحجز الآن</Link>
          </AppButton>
        </div>
      </div>
    </div>
  );
};