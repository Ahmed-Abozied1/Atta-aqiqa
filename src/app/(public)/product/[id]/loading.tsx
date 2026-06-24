import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Product Overview Skeleton */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <Skeleton className="w-full md:w-1/2 h-72 md:h-96 rounded-2xl bg-gray-200" />

          {/* Details */}
          <div className="flex flex-col gap-4 flex-1">
            {/* Category badge */}
            <Skeleton className="h-7 w-24 rounded-full bg-gray-200" />
            {/* Name */}
            <Skeleton className="h-9 w-3/4 rounded-lg bg-gray-200" />
            {/* Rating */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
              <Skeleton className="h-5 w-16 rounded-md bg-gray-200" />
            </div>
            {/* Intent chips */}
            <div className="flex gap-2 flex-wrap mt-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-full bg-gray-200" />
              ))}
            </div>
            {/* Price + button */}
            <div className="flex items-center justify-between mt-auto pt-6">
              <Skeleton className="h-8 w-28 rounded-md bg-gray-200" />
              <Skeleton className="h-12 w-36 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Skeleton */}
      <section className="container mx-auto px-4 mt-4">
        <div className="flex gap-4 border-b border-border pb-2 mb-6">
          <Skeleton className="h-8 w-24 rounded-md bg-gray-200" />
          <Skeleton className="h-8 w-24 rounded-md bg-gray-200" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
          <Skeleton className="h-4 w-5/6 rounded-md bg-gray-200" />
          <Skeleton className="h-4 w-4/6 rounded-md bg-gray-200" />
        </div>
      </section>
    </main>
  );
}
