"use client";

import { useEffect, useState } from "react";
import { AppButton } from "@/components/common/AppButton";
import { Bell, BellOff, Loader2 } from "lucide-react";

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

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function sameKey(sub: PushSubscription, key: string) {
  const current = sub.options?.applicationServerKey;
  if (!current) return true; // بعض المتصفحات مش بترجعه — نفترض إنه سليم
  const a = new Uint8Array(current);
  const b = urlBase64ToUint8Array(key);
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function saveOnServer(sub: PushSubscription) {
  return fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub.toJSON()),
  }).then((res) => {
    if (!res.ok) throw new Error(`subscribe API ${res.status}`);
  });
}

function registerSW() {
  // updateViaCache: none = الموبايل يجيب أحدث نسخة من sw.js دايماً
  return navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

type Status = "loading" | "subscribed" | "unsubscribed" | "unsupported" | "ios-install" | "busy";

export function PushNotificationButton() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const supported = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    if (!supported) {
      // على الآيفون الإشعارات بتشتغل بس لو الموقع متضاف للشاشة الرئيسية
      setStatus(isIOS() && !isStandalone() ? "ios-install" : "unsupported");
      return;
    }

    registerSW()
      .then(async (reg) => {
        let sub = await reg.pushManager.getSubscription();

        // لو مفتاح VAPID اتغير، الاشتراك القديم مش هيستقبل حاجة — نعمل اشتراك جديد
        if (sub && VAPID_KEY && !sameKey(sub, VAPID_KEY)) {
          await sub.unsubscribe();
          sub = null;
          if (Notification.permission === "granted") {
            sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_KEY),
            });
          }
        }

        if (sub && Notification.permission === "granted") {
          // نتأكد إن الاشتراك متسجل على السيرفر كل مرة الصفحة تفتح
          // (الاشتراكات القديمة ضاعت لما قاعدة البيانات اتنقلت)
          saveOnServer(sub).catch((err) => console.error("Push sync failed:", err));
          setStatus("subscribed");
        } else {
          setStatus("unsubscribed");
        }
      })
      .catch((err) => {
        console.error("SW register failed:", err);
        setStatus("unsubscribed");
      });
  }, []);

  async function subscribe() {
    setStatus("busy");
    try {
      // 1) طلب إذن الإشعارات صراحةً (مطلوب على الموبايل)
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("الإشعارات مقفولة للموقع. افتح إعدادات المتصفح ← إعدادات الموقع ← الإشعارات واسمح بيها، وبعدين جرّب تاني.");
        setStatus("unsubscribed");
        return;
      }

      if (!VAPID_KEY) {
        alert("مفتاح الإشعارات غير مضبوط.");
        setStatus("unsubscribed");
        return;
      }

      // نستخدم الـ registration مباشرة بدل serviceWorker.ready اللي ممكن يعلّق للأبد
      const reg = await registerSW();
      const existing = await reg.pushManager.getSubscription();
      const sub =
        existing && sameKey(existing, VAPID_KEY)
          ? existing
          : await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_KEY),
            });
      await saveOnServer(sub);
      setStatus("subscribed");
    } catch (err) {
      console.error("Push subscribe failed:", err);
      alert("حصلت مشكلة في تفعيل الإشعارات. جرّب تاني أو تأكد إن الإشعارات مسموحة للموقع.");
      setStatus("unsubscribed");
    }
  }

  async function unsubscribe() {
    setStatus("busy");
    try {
      const reg = await registerSW();
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
    } catch (err) {
      console.error("Push unsubscribe failed:", err);
    }
    setStatus("unsubscribed");
  }

  if (status === "unsupported" || status === "loading") return null;

  if (status === "ios-install") {
    return (
      <AppButton
        appVariant="primary"
        className="gap-2"
        onClick={() =>
          alert(
            "على الآيفون: اضغط زرار المشاركة في Safari ← «إضافة إلى الشاشة الرئيسية»، وافتح الموقع من الأيقونة الجديدة، وبعدين فعّل الإشعارات من هنا."
          )
        }
      >
        <Bell className="w-4 h-4" />
        تفعيل إشعارات الطلبات
      </AppButton>
    );
  }

  return (
    <AppButton
      appVariant={status === "subscribed" ? "secondary" : "primary"}
      onClick={status === "subscribed" ? unsubscribe : subscribe}
      disabled={status === "busy"}
      className="gap-2"
    >
      {status === "busy" ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : status === "subscribed" ? (
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
