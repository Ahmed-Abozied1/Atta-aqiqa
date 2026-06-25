interface ProductSchemaProps {
  name: string;
  description?: string;
  image?: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  url: string;
}

export function ProductSchema({ name, description, image, price, rating, reviewCount, url }: ProductSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: { "@type": "Brand", name: "مزرعة عطاء" },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "مزرعة عطاء" },
    },
  };

  if (rating && reviewCount && reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
