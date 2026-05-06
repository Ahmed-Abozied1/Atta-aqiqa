import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { OrderStatus } from "@/generated/prisma/enums";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const searchTerm = searchParams.get("searchTerm") || "";
    const status = searchParams.get("status") || "all";
    const bookingType = searchParams.get("bookingType") || "all";
    const scope = searchParams.get("scope") || "all";
    const sortBy = searchParams.get("sortBy") || "newest";

    const where: any = {};

    if (status !== "all") {
      where.status = status;
    }

    if (bookingType !== "all") {
      where.intent = bookingType;
    }

    if (scope !== "all") {
      where.product = {
        location: scope,
      };
    }

    if (searchTerm) {
      const orderNumber = Number(searchTerm);

      where.OR = [
        ...(!isNaN(orderNumber) ? [{ orderNumber }] : []),
        {
          beneficiaryName: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          user: {
            email: { contains: searchTerm, mode: "insensitive" },
          },
        },
        {
          product: {
            name: { contains: searchTerm, mode: "insensitive" },
          },
        },
      ];
    }

    let orderBy: any = { createdAt: "desc" };

    if (sortBy === "name") {
      orderBy = { beneficiaryName: "asc" };
    } else if (sortBy === "oldest") {
      orderBy = { createdAt: "asc" };
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: {
          product: {
            select: {
              name: true,
              location: true,
              price: true,
            },
          },
          user: {
            select: {
              email: true,
              phone: true,
            },
          },
        },
        orderBy,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalOrders: total,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    const body = await request.json();

    const {
      productId,
      intent,
      beneficiaryName,
      phone,
      quantity = 1,
    } = body;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "المنتج غير موجود" },
        { status: 404 }
      );
    }

    const totalPrice = product.price * Number(quantity);

    const order = await prisma.order.create({
      data: {
        ...(session?.user?.id ? { userId: session.user.id } : {}),
        productId,
        intent,
        beneficiaryName,
        phone,
        totalPrice,
        status: OrderStatus.PENDING,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الطلب" },
      { status: 500 }
    );
  }
}