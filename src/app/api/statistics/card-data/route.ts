import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Period } from "@/features/dashboard/types/dashboard.types";

export async function GET(request: NextRequest) {
  try {
    const period = (request.nextUrl.searchParams.get("period") || "weekly") as Period;
    const dateRange = getDateRange(period);

    const [weeklyUsers, weeklyOrders, productTypes, userGrowth, orderGrowth] = await Promise.all([
      getWeeklyUsers(dateRange),
      getWeeklyOrders(dateRange),
      getProductTypes(dateRange),
      calculateGrowth("user", dateRange),
      calculateGrowth("order", dateRange),
    ]);

    return NextResponse.json({
      weeklyUsers,
      weeklyOrders,
      productTypes,
      userGrowth,
      orderGrowth,
    });
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

  let current, previous
  if (type === "user") {
    current = await prisma.user.count({ where: currentWhere })
    previous = await prisma.user.count({ where: previousWhere })
  } else {
    current = await prisma.order.count({ where: currentWhere })
    previous = await prisma.order.count({ where: previousWhere })
  }

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
    select: { createdAt: true} 
  });
  return aggregateByDay(orders.map(o => ({ date: o.createdAt })), "orders");
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
      item.type === "BOOKING" ? result[dayIndex].bookings++ : result[dayIndex].purchases++;
    }
  });
  return result;
}

async function getProductTypes(dateRange: Date) {
  const products = await prisma.product.findMany({
    select: { 
      name: true, 
      orders: { where: { createdAt: { gte: dateRange } } } 
    }
  });
  return products
    .map(p => ({ name: p.name, value: p.orders.length }))
    .filter(p => p.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}