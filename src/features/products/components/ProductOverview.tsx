"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { AppButton } from "@/components/common/AppButton";
import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";
import { useState, useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { INTENT_LABELS } from "../constants";
import { Star } from "@/components/ui/icons/Star";
import { ProductQuantity } from "@/components/common/ProductQuantity";
import { Product } from "../types/product.types";
import { initiateCheckout } from "@/lib/pixel";

type Intention = "SADAKA" | "AQEEQA" | "NAZR" | "KAFFARA" | "ADHIYA" | "BUY";

interface ProductOverviewProps {
  product: Product;
}

const INTENT_ORDER = ["ADHIYA", "BUY", "AQEEQA", "SADAKA", "NAZR", "KAFFARA"];

export const ProductOverview = ({ product }: ProductOverviewProps) => {
  const { open } = useModalStore();

  const [selectedIntention, setSelectedIntention] = useState<Intention | null>(null);
  const [loadingParts, setLoadingParts] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  const productIntents = product.intents || [];

  useEffect(() => {
    if (productIntents.length > 0) {
      if (product?.location === "INSIDE_EGYPT") {
        const adhiyaIntent = productIntents.find(intent => intent === "ADHIYA");
        if (adhiyaIntent) {
          setSelectedIntention(adhiyaIntent as Intention);
        } else {
          setSelectedIntention(productIntents[0] as Intention);
        }
      } else {
        setSelectedIntention(productIntents[0] as Intention);
      }
    }
  }, [product, productIntents]);

  const ratingValue = typeof product?.rating === "number" ? product.rating : 0;

  const getButtonText = () => {
    if (!selectedIntention) return "احجز الآن";
    
    switch (selectedIntention) {
      case "SADAKA":
        return "احجز صدقتك";
      case "AQEEQA":
        return "احجز عقيقتك";
      case "NAZR":
        return "احجز نذرك";
      case "KAFFARA":
        return "احجز كفارتك";
      case "ADHIYA":
        return "احجز أضحيتك";
      case "BUY":
        return "احجز الآن";
      default:
        return "احجز الآن";
    }
  };

  const handleBook = () => {
    if (!product || !selectedIntention) return;

    setLoadingParts(true);

    initiateCheckout({
      content_name: product.name,
      content_ids: [product.id],
      value: product.price * quantity,
      num_items: quantity,
    });

    open("BOOKING", {
      productId: product.id,
      productName: product.name,
      productType: selectedIntention,
      price: product.price,
      location: product.location,
      imageUrl: product.imageUrl || undefined,
      intent: selectedIntention,
      quantity,
      address: product.location === "OUTSIDE_EGYPT" ? null : undefined,
    });

    setLoadingParts(false);
  };

  const isOutsideEgypt = product.location === "OUTSIDE_EGYPT";

  const sortedIntents = [...productIntents].sort((a, b) => {
    return INTENT_ORDER.indexOf(a) - INTENT_ORDER.indexOf(b);
  });

  if (productIntents.length === 0) {
    return null;
  }

  return (
    <section className="container mt-28 md:mt-36">
      <AppBreadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-10">
        <div className="relative w-full aspect-4/3 md:aspect-auto md:h-full rounded-xl md:rounded-2xl overflow-hidden">
          <Image
            src={product.imageUrl || "/images/products/sheep.webp"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-y-2 md:gap-y-4">
          <h2 className="heading-5-bold md:heading-3-bold text-title">
            {product.name}
          </h2>

          {ratingValue > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-small-normal md:text-regular-normal text-title">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(ratingValue)
                        ? "text-rating"
                        : "text-disabled"
                    )}
                  />
                ))}
              </div>
              <span>({ratingValue.toFixed(1)} نجوم)</span>
            </div>
          )}

          <p className="text-regular-normal md:heading-5-normal text-paragraph">
            {product.description}
          </p>

          <div className="flex justify-between items-center my-2 md:my-4">
            <span className="heading-5-bold md:heading-3-bold text-primary">
              {product.price * quantity} ج.م
            </span>
            <ProductQuantity
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={99}
            />
          </div>

          <h3 className="text-large-bold md:heading-5-bold text-title">النية</h3>

          <div className="flex flex-wrap gap-4">
            {sortedIntents.map((intent) => (
              <button
                key={intent}
                onClick={() => setSelectedIntention(intent as Intention)}
                className={cn(
                  "px-4 py-3 rounded-xl border transition cursor-pointer",
                  selectedIntention === intent
                    ? "bg-secondary text-white"
                    : "border-border text-paragraph"
                )}
              >
                {INTENT_LABELS[intent as keyof typeof INTENT_LABELS] || intent}
              </button>
            ))}
          </div>

          {selectedIntention === "BUY" && (
            <div className="mt-3 p-4 rounded-xl bg-muted border border-secondary text-small-medium text-secondary">
              بيتم إتمام الطلب من 3 إلى 5 أيام عمل، وبيوصل لحضرتك فيديو الذبح موثق، واللحوم كاملة متغلفة لحد البيت.
            </div>
          )}

          <AppButton
            onClick={handleBook}
            disabled={loadingParts || !selectedIntention}
            className="w-full h-14 md:min-h-14 rounded-xl md:rounded-2xl text-medium-bold text-bg mt-4"
          >
            {loadingParts ? "جاري التحميل..." : getButtonText()}
          </AppButton>
        </div>
      </div>
    </section>
  );
};