// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.review.findMany({
      where: {
        rating: { gte: 4 },
      },
      include: {
        user: true,
        product: true,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedTestimonials = testimonials.map(review => ({
      id: review.id,
      name: review.user.name,
      rating: review.rating,
      comment: review.comment,
      date: review.createdAt,
    }));

    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}