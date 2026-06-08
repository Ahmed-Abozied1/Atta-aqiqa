import localFont from "next/font/local";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import { GlobalModalContainer } from "@/components/common/GlobalModalContainer";
import { Providers } from "@/components/common/Providers";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sstArabic = localFont({
  src: [   
    {
      path: "../../public/fonts/sst-arabic-roman.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/sst-arabic-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/sst-arabic-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sst",
  display: "swap",
});

export const metadata = {
  title: "عطاء",
  description: "مؤسسة عطاء للأضاحي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${sstArabic.variable} antialiased font-sst`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Providers>
          <GlobalModalContainer />
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}