import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { generateSlug } from "@/lib/slug";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 10)));

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

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
        select: {
          id: true,
          slug: true,
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
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: products,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
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
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const validLocations = ["INSIDE_EGYPT", "OUTSIDE_EGYPT"];
    const price = Number(body.price);

    if (!body.name?.trim() || !body.location || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validLocations.includes(body.location)) {
      return NextResponse.json({ error: "Invalid location" }, { status: 400 });
    }
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const baseSlug = generateSlug(body.name.trim());
    let slug = baseSlug;
    let suffix = 1;
    while (slug && await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    const product = await prisma.product.create({
      data: {
        name: body.name.trim(),
        slug: slug || null,
        description: body.description || "",
        price,
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