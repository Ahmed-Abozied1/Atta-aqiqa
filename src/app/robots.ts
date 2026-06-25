import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/profile"],
      },
    ],
    sitemap: "https://www.ataa-aqiqa.com/sitemap.xml",
    host: "https://www.ataa-aqiqa.com",
  };
}
