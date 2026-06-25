import ProductPage from "@/features/products/components"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { unstable_cache } from "next/cache"

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
          select: { id: true, rating: true, comment: true, guestName: true, createdAt: true, user: { select: { name: true, image: true } } },
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

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const initialProduct = await getCachedProduct(decoded);
  if (!initialProduct) notFound();
  return <ProductPage id={decoded} initialProduct={initialProduct} />;
}
