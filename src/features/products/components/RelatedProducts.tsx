"use client";

import { RelatedProductsCarousel } from "./RelatedProductsCarousel";
import { Product } from "../types/product.types";

interface RelatedProductsProps {
  products: Product[];
  loading: boolean;
  error: any;
}

export const RelatedProducts = ({ products, loading, error }: RelatedProductsProps) => {
  const relatedProducts = products.slice(0, 8);

  if (error || relatedProducts.length === 0) return null;

  return (
    <section className="container py-8 md:py-16 flex flex-col gap-4 md:gap-10 relative">
      <h2 className="heading-6-bold md:heading-3-bold text-title">منتجات أخرى</h2>
      <RelatedProductsCarousel products={relatedProducts} />
    </section>
  );
};