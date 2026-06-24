"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { pageview } from "@/lib/pixel";

function PixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    pageview();
  }, [pathname, searchParams]);

  return null;
}

export function FacebookPixel() {
  return (
    <Suspense fallback={null}>
      <PixelTracker />
    </Suspense>
  );
}
