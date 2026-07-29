"use client";

import { useEffect, useState } from "react";
import { AppButton } from "@/components/common/AppButton";
import { Bell, BellOff } from "lucide-react";

// تحويل مفتاح VAPID من صيغة base64url إلى Uint8Array — مطلوب على متصفحات الموبايل
function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(new ArrayBuffer(rawData.length));
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

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
    try {
      // 1) طلب إذن الإشعارات صراحةً (مطلوب على الموبايل)
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("لازم تسمح بالإشعارات من إعدادات المتصفح عشان تشتغل.");
        return;
      }

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        alert("مفتاح الإشعارات غير مضبوط.");
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      // 2) تحويل المفتاح للصيغة الصح قبل الاشتراك
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
      setStatus("subscribed");
    } catch (err) {
      console.error("Push subscribe failed:", err);
      alert("حصلت مشكلة في تفعيل الإشعارات. جرّب تاني أو تأكد إن الإشعارات مسموحة للموقع.");
    }
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
