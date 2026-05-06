import { Skeleton } from "@/components/ui/skeleton";

export const ProductOverviewSkeleton = () => {
  return (
    <section className="container mt-28 md:mt-36">
      <div className="h-10 w-48 bg-card rounded-xl animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-10">
        <Skeleton className="h-96 w-full rounded-xl md:rounded-2xl bg-card" />

        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4 rounded-md bg-card" />

          <div className="flex items-center gap-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-6 h-6 rounded-full bg-card" />
              ))}
            </div>
            <Skeleton className="h-4 w-16 rounded-md bg-card" />
          </div>

          <Skeleton className="h-24 w-full rounded-md bg-card" />

          <Skeleton className="h-8 w-1/3 rounded-md bg-card" />

          <Skeleton className="h-6 w-1/4 rounded-md bg-card" />

          <div className="flex flex-wrap gap-4 mt-2">
            <Skeleton className="px-4 py-2 rounded-lg bg-card w-24 h-10" />
            <Skeleton className="px-4 py-2 rounded-lg bg-card w-24 h-10" />
          </div>

          <Skeleton className="h-14 w-full rounded-xl bg-card mt-4" />
        </div>
      </div>
    </section>
  );
};