import prisma from "./prisma";

const WINDOW_MS = 60_000 * 60 * 24 * 30; // 30 days
const MAX_REQUESTS = 10;

export async function rateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const now = new Date();
  const resetAt = new Date(Date.now() + WINDOW_MS);

  const entry = await prisma.ipRateLimit.findUnique({ where: { ip } });

  // No entry or window expired → reset
  if (!entry || now > entry.resetAt) {
    await prisma.ipRateLimit.upsert({
      where: { ip },
      create: { ip, count: 1, resetAt },
      update: { count: 1, resetAt },
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  await prisma.ipRateLimit.update({
    where: { ip },
    data: { count: { increment: 1 } },
  });

  return { allowed: true, remaining: MAX_REQUESTS - (entry.count + 1) };
}
