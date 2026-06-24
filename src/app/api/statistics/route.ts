import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const [totalUsers, totalOrders, reviews] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      getReviews(),
    ]);

    return NextResponse.json(
      {
        totalUsers,
        totalOrders,
        averageRating: reviews.average,
        totalReviews: reviews.total,
        ratingDistribution: reviews.distribution,
      },
      { headers: { "Cache-Control": "private, max-age=30, stale-while-revalidate=60" } }
    );
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 });
  }
}

async function getReviews() {
  const [aggregate, grouped] = await Promise.all([
    prisma.review.aggregate({ _avg: { rating: true }, _count: { rating: true } }),
    prisma.review.groupBy({ by: ["rating"], _count: { rating: true } }),
  ]);

  const total = aggregate._count.rating;
  const average = total > 0 ? Number((aggregate._avg.rating ?? 0).toFixed(1)) : 0;
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  grouped.forEach(({ rating, _count }) => {
    if (rating >= 1 && rating <= 5) distribution[rating] = _count.rating;
  });

  return { average, total, distribution };
}