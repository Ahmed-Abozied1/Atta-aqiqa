import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { OrderStatus } from "@/generated/prisma/enums";
import { sendPushToAdmins } from "@/lib/push";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 10)));
    const skip = (page - 1) * limit;

    const searchTerm = searchParams.get("searchTerm") || "";
    const status = searchParams.get("status") || "all";
    const bookingType = searchParams.get("bookingType") || "all";
    const scope = searchParams.get("scope") || "all";
    const sortBy = searchParams.get("sortBy") || "newest";

    const archived = searchParams.get("archived") === "true";
    const where: any = { isArchived: archived };

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

    return NextResponse.json(
      { orders, totalPages: Math.ceil(total / limit), currentPage: page, totalOrders: total },
      { headers: { "Cache-Control": "private, max-age=15, stale-while-revalidate=30" } }
    );
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
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { allowed } = rateLimit(ip);
    if (!allowed) {
      return NextResponse.json({ error: "طلبات كثيرة، حاول بعد دقيقة" }, { status: 429 });
    }

    const body = await request.json();

    const {
      productId,
      intent,
      beneficiaryName,
      phone,
      quantity = 1,
    } = body;

    const validIntents = ["SADAKA", "AQEEQA", "NAZR", "ADHIYA", "KAFFARA", "BUY"];
    const parsedQty = Number(quantity);

    if (!productId || !intent || !validIntents.includes(intent) || !beneficiaryName || !phone) {
      return NextResponse.json({ error: "بيانات مطلوبة ناقصة" }, { status: 400 });
    }
    if (!Number.isInteger(parsedQty) || parsedQty < 1 || parsedQty > 100) {
      return NextResponse.json({ error: "الكمية غير صحيحة" }, { status: 400 });
    }

    // Fetch price from DB — never trust client-supplied price
    const product = await prisma.product.findUnique({ where: { id: productId }, select: { price: true } });
    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    const cookieStore = await cookies();
    const hasSession = cookieStore.has("better-auth.session_token");
    const session = hasSession ? await getServerSession() : null;

    const totalPrice = Math.round(product.price * parsedQty * 100) / 100;

    const order = await prisma.order.create({
      data: {
        ...(session?.user?.id ? { userId: session.user.id } : {}),
        productId,
        intent,
        beneficiaryName: beneficiaryName.trim(),
        phone,
        quantity: parsedQty,
        totalPrice,
        status: OrderStatus.PENDING,
      },
    });

    sendPushToAdmins(
      "طلب جديد",
      `${beneficiaryName} — ${order.orderNumber}`
    ).catch(() => {});

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الطلب" },
      { status: 500 }
    );
  }
}