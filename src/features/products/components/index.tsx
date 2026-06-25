"use client";

import { useEffect } from "react";
import { ProductOverview } from "./ProductOverview";
import { ProductTabs } from "./ProductTabs";
import { RelatedProducts } from "./RelatedProducts";
import { useProduct } from "../hooks/useProduct";
import { useRelatedProducts } from "../hooks/useRelatedProducts";
import { Loading } from "@/components/common/Loading";
import { Product } from "../types/product.types";
import { viewContent } from "@/lib/pixel";

interface ProductPageProps {
  id: string;
  initialProduct?: Product | null;
}

export default function ProductPage({ id, initialProduct }: ProductPageProps) {
  const { product, loading: productLoading, error: productError } = useProduct(id, initialProduct);
  const { products, loading: relatedLoading, error: relatedError } = useRelatedProducts(id);

  useEffect(() => {
    if (product) {
      viewContent({
        content_name: product.name,
        content_ids: [product.id],
        value: product.price,
      });
    }
  }, [product]);

  if (productLoading) {
    return <Loading />;
  }

  if (productError || !product) {
    return (
      <div className="text-center py-10">
        Error loading product
      </div>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ProductOverview product={product} />
      <ProductTabs productId={product.id} />
      <RelatedProducts products={products} loading={relatedLoading} error={relatedError} />
    </main>
  );
}