self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    Promise.all([
      self.registration.showNotification(data.title || "إشعار جديد", {
        body: data.body || "",
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        dir: "rtl",
        lang: "ar",
      }),
      self.clients.matchAll({ type: "window" }).then((clients) => {
        clients.forEach((client) => client.postMessage({ type: "NEW_ORDER" }));
      }),
    ])
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/admin/orders"));
});
