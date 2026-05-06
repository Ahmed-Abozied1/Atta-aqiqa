import { useState } from "react";
import { ProductSkeleton } from './ProductSkeleton';
import { Product } from '../../types';
import { Carousel } from '@/components/common/Carousel';
import { ProductCard } from "@/components/common/ProductCard";

interface ProductsCarouselProps {
  products: Product[];
  loading?: boolean;
}

export const ProductsCarousel = ({
  products,
  loading = false,
}: ProductsCarouselProps) => {

  return (
    <Carousel
      items={products}
      loading={loading}
      renderItem={(item) => (
        <ProductCard
          {...item}
        />
      )}
      renderSkeleton={() => <ProductSkeleton />}
    />
  );
};