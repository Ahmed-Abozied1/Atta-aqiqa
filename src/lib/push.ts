import webpush from "web-push";
import prisma from "./prisma";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_CONTACT_EMAIL ?? "admin@ataa-aqiqa.com"}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

type PushPayload = { title: string; body: string; tag?: string; url?: string };

export async function sendPushToAdmins(title: string, body: string, extra: Omit<PushPayload, "title" | "body"> = {}) {
  const subscriptions = await prisma.pushSubscription.findMany();
  if (subscriptions.length === 0) {
    console.warn("[push] no subscriptions — no staff device will be notified");
    return;
  }
  const payload = JSON.stringify({ title, body, ...extra });

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
        {
          // high = يصحّي الموبايل حتى لو في وضع توفير الطاقة (Doze) بدل ما يتأخر
          urgency: "high",
          // لو الموبايل مقفول/أوفلاين، الإشعار يفضل مستني لحد 24 ساعة
          TTL: 60 * 60 * 24,
          timeout: 10_000,
        }
      )
    )
  );

  // امسح الاشتراكات المنتهية (404/410) عشان متفضلش تبطّأ الإرسال
  const expired: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      const code = (r.reason as { statusCode?: number })?.statusCode;
      if (code === 404 || code === 410) expired.push(subscriptions[i].endpoint);
      else console.error("[push] send failed", code, (r.reason as Error)?.message);
    }
  });
  if (expired.length) {
    await prisma.pushSubscription.deleteMany({ where: { endpoint: { in: expired } } });
  }
}
