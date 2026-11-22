import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { canManageOrders } from "@/lib/roles";

type SubJSON = { endpoint?: string; keys?: { p256dh?: string; auth?: string } };

function isValid(sub: SubJSON): sub is { endpoint: string; keys: { p256dh: string; auth: string } } {
  return !!(sub?.endpoint && sub.keys?.p256dh && sub.keys?.auth);
}

async function save(sub: { endpoint: string; keys: { p256dh: string; auth: string } }) {
  await prisma.pushSubscription.upsert({
    where: { endpoint: sub.endpoint },
    update: { p256dh: sub.keys.p256dh, auth: sub.keys.auth },
    create: { endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user || !canManageOrders(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sub = (await req.json()) as SubJSON;
  if (!isValid(sub)) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }
  await save(sub);
  return NextResponse.json({ ok: true });
}

// يستدعيه الـ service worker لما المتصفح يجدّد الاشتراك لوحده
export async function PUT(req: NextRequest) {
  const { oldEndpoint, subscription } = (await req.json()) as {
    oldEndpoint?: string | null;
    subscription: SubJSON;
  };
  if (!isValid(subscription)) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }

  // مسموح لو الموظف مسجّل دخول، أو لو الاشتراك القديم كان مسجّل عندنا فعلاً
  const session = await getServerSession();
  const authorized =
    (session?.user && canManageOrders(session.user.role)) ||
    (oldEndpoint && (await prisma.pushSubscription.findUnique({ where: { endpoint: oldEndpoint } })));
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (oldEndpoint && oldEndpoint !== subscription.endpoint) {
    await prisma.pushSubscription.deleteMany({ where: { endpoint: oldEndpoint } });
  }
  await save(subscription);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { endpoint } = await req.json();
  await prisma.pushSubscription.deleteMany({ where: { endpoint } });
  return NextResponse.json({ ok: true });
}
