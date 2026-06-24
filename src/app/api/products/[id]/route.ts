import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { Prisma } from "@/generated/prisma/client";
import { revalidateTag } from "next/cache";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const averageRating =
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
          product.reviews.length
        : 0;

    return NextResponse.json(
      { ...product, averageRating },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const validLocations = ["INSIDE_EGYPT", "OUTSIDE_EGYPT"];
    const validIntents = ["ADHIYA", "BUY", "AQEEQA", "NAZR", "KAFFARA", "SADAKA"];
    const price = Number(body.price);

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "الاسم مطلوب" }, { status: 400 });
    }
    if (!body.location || !validLocations.includes(body.location)) {
      return NextResponse.json({ error: "الموقع غير صحيح" }, { status: 400 });
    }
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "السعر غير صحيح" }, { status: 400 });
    }
    const intents = Array.isArray(body.intents)
      ? body.intents.filter((i: string) => validIntents.includes(i))
      : [];

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name.trim(),
        description: body.description || "",
        price,
        location: body.location,
        beneficiaries: body.beneficiaries || "",
        intents,
        imageUrl: body.imageUrl ?? undefined,
      },
    });

    revalidateTag("products", {});
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
      }
    }
    console.error("Update product error:", error);
    return NextResponse.json({ error: "فشل تحديث المنتج" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        orders: true,
        reviews: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.order.deleteMany({ where: { productId: id } }),
      prisma.review.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } }),
    ]);

    revalidateTag("products", {});
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}