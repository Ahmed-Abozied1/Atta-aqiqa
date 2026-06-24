import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { Period } from "@/features/dashboard/types/dashboard.types";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const period = (request.nextUrl.searchParams.get("period") || "weekly") as Period;
    const dateRange = getDateRange(period);

    const [weeklyUsers, weeklyOrders, productTypes, userGrowth, orderGrowth] = await Promise.all([
      getWeeklyUsers(dateRange),
      getWeeklyOrders(dateRange),
      getProductTypes(dateRange),
      calculateGrowth("user", dateRange),
      calculateGrowth("order", dateRange),
    ]);

    return NextResponse.json(
      { weeklyUsers, weeklyOrders, productTypes, userGrowth, orderGrowth },
      { headers: { "Cache-Control": "private, max-age=30, stale-while-revalidate=60" } }
    );
  } catch (error) {
    console.error("Card Data API Error:", error);
    return NextResponse.json({ error: "Failed to fetch card data" }, { status: 500 });
  }
}

function getDateRange(period: Period): Date {
  const now = new Date();
  const date = new Date(now);
  switch (period) {
    case "monthly": date.setMonth(date.getMonth() - 1); break;
    case "yearly": date.setFullYear(date.getFullYear() - 1); break;
    default: date.setDate(date.getDate() - 7); break;
  }
  return date;
}

async function calculateGrowth(type: "user" | "order", dateRange: Date): Promise<number> {
  const currentWhere = { createdAt: { gte: dateRange } }
  const prevStart = new Date(dateRange)
  prevStart.setDate(prevStart.getDate() - 7)
  const previousWhere = { createdAt: { gte: prevStart, lt: dateRange } }

  const [current, previous] = await Promise.all(
    type === "user"
      ? [prisma.user.count({ where: currentWhere }), prisma.user.count({ where: previousWhere })]
      : [prisma.order.count({ where: currentWhere }), prisma.order.count({ where: previousWhere })]
  )

  if (previous === 0 && current === 0) return 0
  if (previous === 0 && current > 0) return Number(current.toFixed(2))

  return Number(((current - previous) / previous * 100).toFixed(2))
}

async function getWeeklyUsers(dateRange: Date) {
  const users = await prisma.user.findMany({ 
    where: { createdAt: { gte: dateRange } }, 
    select: { createdAt: true } 
  });
  return aggregateByDay(users.map(u => u.createdAt), "users");
}

async function getWeeklyOrders(dateRange: Date) {
  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: dateRange } },
    select: { createdAt: true, intent: true }
  });
  return aggregateByDay(orders.map(o => ({ date: o.createdAt, intent: o.intent })), "orders");
}

function aggregateByDay(data: any[], kind: "users" | "orders") {
  const days = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const result = days.map(day => ({ name: day, users: 0, bookings: 0, purchases: 0 }));

  data.forEach(item => {
    const dateValue = kind === "users" ? item : item.date;
    const dayIndex = new Date(dateValue).getDay();
    if (kind === "users") {
      result[dayIndex].users++;
    } else {
      item.intent === "BUY" ? result[dayIndex].purchases++ : result[dayIndex].bookings++;
    }
  });
  return result;
}

async function getProductTypes(dateRange: Date) {
  const grouped = await prisma.order.groupBy({
    by: ["productId"],
    where: { createdAt: { gte: dateRange } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });

  if (grouped.length === 0) return [];

  const productIds = grouped.map(g => g.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true },
  });

  const nameMap = new Map(products.map(p => [p.id, p.name]));
  return grouped.map(g => ({ name: nameMap.get(g.productId) ?? "منتج محذوف", value: g._count.id }));
}