import localFont from "next/font/local";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import { GlobalModalContainer } from "@/components/common/GlobalModalContainer";
import { Providers } from "@/components/common/Providers";
import { FacebookPixel } from "@/components/common/FacebookPixel";
import Script from "next/script";

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
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  return (
    <html lang="ar" dir="rtl">
      <body className={`${sstArabic.variable} antialiased font-sst`}>
        {pixelId && (
          <>
            <Script
              id="fb-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${pixelId}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Providers>
          <FacebookPixel />
          <GlobalModalContainer />
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}