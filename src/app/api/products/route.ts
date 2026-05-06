import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const location = searchParams.get("location"); 
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "newest";

    const where: any = {};

    if (location === "inside") {
      where.location = "INSIDE_EGYPT";
    }

    if (location === "outside") {
      where.location = "OUTSIDE_EGYPT";
    }

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    let orderBy: any = { createdAt: "desc" };

    if (sortBy === "oldest") orderBy = { createdAt: "asc" };
    if (sortBy === "price") orderBy = { price: "asc" };

    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        location: true,
        beneficiaries: true,
        imageUrl: true,
        intents: true,
        reviewsCount: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const total = await prisma.product.count({ where });

    return NextResponse.json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    if (!body.name || !body.price || !body.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: Number(body.price),
        location: body.location,
        beneficiaries: body.beneficiaries || "",
        intents: body.intents || [],
        imageUrl: body.imageUrl || null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}