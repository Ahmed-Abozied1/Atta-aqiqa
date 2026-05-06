"use client";

import { ProductOverview } from "./ProductOverview";
import { ProductTabs } from "./ProductTabs";
import { RelatedProducts } from "./RelatedProducts";
import { useProduct } from "../hooks/useProduct";
import { useRelatedProducts } from "../hooks/useRelatedProducts";
import { Loading } from "@/components/common/Loading";


export default function ProductPage({ id }:{id:string}) {
  const { product, loading: productLoading, error: productError } = useProduct(id);
  const { products, loading: relatedLoading, error: relatedError } = useRelatedProducts(id);

  if (productLoading || relatedLoading) {
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
      <ProductTabs productId={id} />
      <RelatedProducts products={products} loading={relatedLoading} error={relatedError} />
    </main>
  );
}