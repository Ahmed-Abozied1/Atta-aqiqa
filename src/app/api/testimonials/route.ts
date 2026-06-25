// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.review.findMany({
      where: {
        rating: { gte: 4 },
        isApproved: true,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        guestName: true,
        guestImage: true,
        user: { select: { name: true, image: true } },
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedTestimonials = testimonials.map(review => ({
      id: review.id,
      name: review.guestName || review.user?.name || "مجهول",
      image: review.guestImage || review.user?.image || null,
      rating: review.rating,
      comment: review.comment,
      date: review.createdAt,
    }));

    return NextResponse.json(formattedTestimonials, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}