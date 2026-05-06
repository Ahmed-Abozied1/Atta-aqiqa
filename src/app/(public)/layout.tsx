import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Suspense } from "react";
import { Loading } from "@/components/common/Loading";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Navbar /> 
      <main className="grow">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}