import webpush from "web-push";
import prisma from "./prisma";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_CONTACT_EMAIL ?? "admin@ataa-aqiqa.com"}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendPushToAdmins(title: string, body: string) {
  const subscriptions = await prisma.pushSubscription.findMany();
  const payload = JSON.stringify({ title, body });

  await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload
      ).catch(async (err) => {
        if (err.statusCode === 410) {
          await prisma.pushSubscription.delete({ where: { endpoint: sub.endpoint } });
        }
      })
    )
  );
}
