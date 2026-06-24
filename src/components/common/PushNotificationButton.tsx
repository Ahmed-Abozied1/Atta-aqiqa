"use client";

import { useEffect, useState } from "react";
import { AppButton } from "@/components/common/AppButton";
import { Bell, BellOff } from "lucide-react";

export function PushNotificationButton() {
  const [status, setStatus] = useState<"loading" | "subscribed" | "unsubscribed" | "unsupported">("loading");

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    navigator.serviceWorker.register("/sw.js").then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      setStatus(sub ? "subscribed" : "unsubscribed");
    });
  }, []);

  async function subscribe() {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });
    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    });
    setStatus("subscribed");
  }

  async function unsubscribe() {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      await fetch("/api/push/subscribe", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: sub.endpoint }),
      });
      await sub.unsubscribe();
    }
    setStatus("unsubscribed");
  }

  if (status === "unsupported" || status === "loading") return null;

  return (
    <AppButton
      appVariant={status === "subscribed" ? "secondary" : "primary"}
      onClick={status === "subscribed" ? unsubscribe : subscribe}
      className="gap-2"
    >
      {status === "subscribed" ? (
        <>
          <BellOff className="w-4 h-4" />
          إيقاف الإشعارات
        </>
      ) : (
        <>
          <Bell className="w-4 h-4" />
          تفعيل إشعارات الطلبات
        </>
      )}
    </AppButton>
  );
}
