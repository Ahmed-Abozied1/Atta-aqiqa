import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const lastProduct = await prisma.product.findFirst({
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });

    if (!lastProduct) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    return NextResponse.json({ id: lastProduct.id });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}