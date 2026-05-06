"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ProductDescription } from "./ProductDescription";
import { ProductReviews } from "./ProductReviews";
import { ProductDocumentation } from "./ProductDocumentation";
import { ProductFAQ } from "./ProductFAQ";
import { useProduct } from "../hooks/useProduct";

const TABS = [
  { id: "about", label: "نبذة" },
  { id: "reviews", label: "تقييمات" },
  { id: "documentation", label: "طريقة التوثيق" },
  { id: "faq", label: "الاستفسارات" },
];

const getTabs = (location?: string) => {
  if (location === "INSIDE_EGYPT") {
    return TABS.filter(
      (tab) => tab.id !== "documentation" && tab.id !== "faq"
    );
  }

  return TABS;
};

interface ProductTabsProps {
  productId: string;
}

export const ProductTabs = ({ productId }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("about");
  const { product, loading } = useProduct(productId);

  if (loading) return null;

  const tabs = getTabs(product?.location);


  return (
    <section className="container mt-10">
      <div className="flex items-center gap-4 mb-6 md:mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "gap-2 md:gap-4 px-2 md:px-8 py-2.75 md:py-3.5 text-medium-bold lg:text-large-bold cursor-pointer",
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-paragraph"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "about" && <ProductDescription location={product?.location}/>}
        {activeTab === "reviews" && <ProductReviews productId={productId} />}
        {activeTab === "documentation" && <ProductDocumentation />}
        {activeTab === "faq" && <ProductFAQ />}
      </div>
    </section>
  );
};