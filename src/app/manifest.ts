import type { MetadataRoute } from "next";

// مطلوب عشان الآيفون يسمح بالإشعارات (لازم الموقع يتضاف للشاشة الرئيسية)
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "عطاء للعقيقة",
    short_name: "عطاء",
    start_url: "/",
    display: "standalone",
    dir: "rtl",
    lang: "ar",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
