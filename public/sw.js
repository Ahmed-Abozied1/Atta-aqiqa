// Service worker لإشعارات الطلبات

// تفعيل النسخة الجديدة فوراً بدل ما تستنى قفل كل التابات
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

function notifyClients() {
  return self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((clients) => clients.forEach((c) => c.postMessage({ type: "NEW_ORDER" })))
    .catch(() => {});
}

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { body: event.data ? event.data.text() : "" };
  }

  const title = data.title || "طلب جديد";
  const options = {
    body: data.body || "",
    // Android مش بيعرض أيقونات SVG في الإشعارات — لازم PNG
    icon: "/icons/icon-192.png",
    badge: "/icons/badge-96.png",
    dir: "rtl",
    lang: "ar",
    tag: data.tag || `order-${Date.now()}`,
    renotify: true,
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 300],
    timestamp: Date.now(),
    data: { url: data.url || "/admin/orders" },
  };

  // لازم دايماً نعرض إشعار (iOS/Chrome بيلغوا الاشتراك لو مفيش إشعار ظهر)
  event.waitUntil(
    self.registration
      .showNotification(title, options)
      .catch(() => self.registration.showNotification(title, { body: options.body }))
      .then(notifyClients)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/admin/orders";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        const adminClient = clients.find((c) => c.url.includes("/admin"));
        if (adminClient) {
          adminClient.postMessage({ type: "NEW_ORDER" });
          return adminClient.focus();
        }
        return self.clients.openWindow(url);
      })
  );
});

// لو المتصفح جدّد الاشتراك لوحده، نسجّل الجديد على السيرفر
self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil(
    (async () => {
      const oldSub = event.oldSubscription;
      const newSub =
        event.newSubscription ||
        (oldSub &&
          (await self.registration.pushManager.subscribe(oldSub.options)));
      if (!newSub) return;
      await fetch("/api/push/subscribe", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          oldEndpoint: oldSub ? oldSub.endpoint : null,
          subscription: newSub.toJSON(),
        }),
      });
    })().catch(() => {})
  );
});
