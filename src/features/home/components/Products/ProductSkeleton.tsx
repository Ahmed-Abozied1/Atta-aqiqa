import { Skeleton } from "@/components/ui/skeleton"

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]! animate-pulse">
      <div className="h-60">
        <Skeleton className="w-full h-full bg-card" />
      </div>

      <div className="px-4 mt-3">
        <Skeleton className="h-6 w-24 rounded-full mb-3 bg-card" />

        <div className="flex justify-between items-center mb-3">
          <Skeleton className="h-5 w-1/2 rounded-md bg-card" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full bg-card" />
            <Skeleton className="h-4 w-8 rounded-md bg-card" />
          </div>
        </div>
      </div>

      <div className="border-t border-border mb-4" />

      <div className="px-4 flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-20 rounded-md bg-bg" />
        <Skeleton className="h-10 w-28 rounded-lg bg-bg" />
      </div>
    </div>
  )
}