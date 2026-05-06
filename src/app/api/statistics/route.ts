import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalUsers, totalOrders, reviews] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      getReviews(),
    ]);

    return NextResponse.json({
      totalUsers,
      totalOrders,
      averageRating: reviews.average,
      totalReviews: reviews.total,
      ratingDistribution: reviews.distribution,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 });
  }
}

async function getReviews() {
  const reviews = await prisma.review.findMany({ select: { rating: true } });
  const total = reviews.length;
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  if (!total) return { average: 0, total: 0, distribution };
  
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  reviews.forEach(r => {
    const rate = r.rating as keyof typeof distribution;
    if (distribution[rate] !== undefined) distribution[rate]++;
  });

  return { 
    average: Number((sum / total).toFixed(1)), 
    total, 
    distribution 
  };
}