import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, rating, comment } = await request.json();

    if (!productId || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 400 });
    }
    if (comment !== undefined && (typeof comment !== "string" || comment.length > 1000)) {
      return NextResponse.json({ error: "التعليق طويل جداً" }, { status: 400 });
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    });

    if (existingReview) {
      const review = await prisma.review.update({
        where: { id: existingReview.id },
        data: { 
          rating, 
          comment,
          isApproved: false
        },
        include: { user: { select: { name: true, image: true } } },
      });
      return NextResponse.json(review);
    }

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId,
        rating,
        comment,
        isApproved: false,
      },
      include: { user: { select: { name: true, image: true } } },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    const cookieStore = await cookies();
    const hasSession = cookieStore.has("better-auth.session_token");
    const session = hasSession ? await getServerSession() : null;

    const where: any = {};
    if (productId) where.productId = productId;

    const isAdmin = session?.user?.role === "ADMIN";

    if (!isAdmin) {
      where.isApproved = true;
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const headers: Record<string, string> = !isAdmin
      ? { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" }
      : {};
    return NextResponse.json(reviews, { headers });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}