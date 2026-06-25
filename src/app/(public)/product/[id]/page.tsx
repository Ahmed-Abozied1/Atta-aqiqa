import type { Metadata } from "next";
import ProductPage from "@/features/products/components"
import { ProductSchema } from "@/components/common/ProductSchema"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { unstable_cache } from "next/cache"

const BASE_URL = "https://www.ataa-aqiqa.com";

interface PageProps {
  params: Promise<{ id: string }>;
}

const getCachedProduct = unstable_cache(
  async (id: string) => {
    const raw = await prisma.product.findFirst({
      where: { OR: [{ slug: id }, { id }] },
      include: {
        reviews: {
          where: { isApproved: true },
          select: { id: true, rating: true, comment: true, guestName: true, guestImage: true, createdAt: true, user: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
      },
    });

    if (!raw) return null;

    const averageRating =
      raw.reviews.length > 0
        ? raw.reviews.reduce((sum, r) => sum + r.rating, 0) / raw.reviews.length
        : 0;

    return JSON.parse(JSON.stringify({
      ...raw,
      averageRating,
      reviewsCount: raw.reviews.length,
    }));
  },
  ["product-detail"],
  { revalidate: 300, tags: ["products"] }
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const product = await getCachedProduct(decoded);

  if (!product) return { title: "المنتج غير موجود" };

  const title = `${product.name} | عطاء`;
  const description = product.description
    ? product.description.slice(0, 155)
    : `احجز ${product.name} من مزرعة عطاء بسعر ${product.price} جنيه. ذبيحة موثوقة مع توثيق كامل.`;
  const url = `${BASE_URL}/product/${encodeURIComponent(product.slug ?? product.id)}`;
  const image = product.imageUrl ?? "/images/hero-bg.webp";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "ar_EG",
      siteName: "عطاء",
      images: [{ url: image, width: 800, height: 600, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const initialProduct = await getCachedProduct(decoded);
  if (!initialProduct) notFound();

  const productUrl = `${BASE_URL}/product/${encodeURIComponent(initialProduct.slug ?? initialProduct.id)}`;

  return (
    <>
      <ProductSchema
        name={initialProduct.name}
        description={initialProduct.description}
        image={initialProduct.imageUrl}
        price={initialProduct.price}
        rating={initialProduct.averageRating}
        reviewCount={initialProduct.reviewsCount}
        url={productUrl}
      />
      <ProductPage id={decoded} initialProduct={initialProduct} />
    </>
  );
}
