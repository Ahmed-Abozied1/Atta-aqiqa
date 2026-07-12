self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};

  event.waitUntil(
    self.registration
      .showNotification(data.title || "إشعار جديد", {
        body: data.body || "",
        icon: "/images/logo.svg",
        dir: "rtl",
        lang: "ar",
      })
      .then(() =>
        self.clients
          .matchAll({ type: "window", includeUncontrolled: true })
          .then((clients) => {
            clients.forEach((client) =>
              client.postMessage({ type: "NEW_ORDER" })
            );
          })
      )
      .catch(() => {
        // إذا فشل عرض الإشعار، أرسل الرسالة للـ clients على الأقل
        return self.clients
          .matchAll({ type: "window", includeUncontrolled: true })
          .then((clients) => {
            clients.forEach((client) =>
              client.postMessage({ type: "NEW_ORDER" })
            );
          });
      })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        const adminClient = clients.find((c) =>
          c.url.includes("/admin")
        );
        if (adminClient) return adminClient.focus();
        return self.clients.openWindow("/admin/orders");
      })
  );
});
