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
}) => {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]! bg-[#FDFDFD]">
      <div className="h-60">
        <Image
          src={imageUrl || ""}
          alt={name}
          width={280}
          height={280}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="px-4">
        <span className="bg-[#E9F7EF] text-success h-8 text-small-bold px-4 py-2 rounded-full w-fit flex items-center">
          {beneficiaries}
        </span>

        <div className="flex justify-between gap-4 items-center mt-2 md:mt-2 mb-2">
          <h3 className="text-large-bold md:heading-5-bold">{name}</h3>

          {rating > 0 && (
            <div className="flex items-center gap-0.75">
              <Star className="w-4.5 h-4.5 fill-rating text-rating" />
              <span className="text-regular-medium text-title">{rating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-2 border-t border-border" />

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-baseline gap-0.75 text-large-bold text-primary">
            <span>{price}</span>
            <span>ج.م</span>
          </div>

          <AppButton
            asChild
            appVariant="secondary"
            className="text-regular-medium! px-4! h-12!"
          >
            <Link href={`/product/${id}`}>أحجز الآن</Link>
          </AppButton>
        </div>
      </div>
    </div>
  );
};