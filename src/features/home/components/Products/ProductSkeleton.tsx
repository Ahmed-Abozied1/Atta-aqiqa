import { Skeleton } from "@/components/ui/skeleton"

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col min-h-95 rounded-2xl overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]! animate-pulse bg-[#FDFDFD]">
      <Skeleton className="w-full h-60 rounded-none bg-gray-200" />

      <div className="px-4 pt-3 flex flex-col flex-1">
        <Skeleton className="h-8 w-28 rounded-full bg-gray-200" />

        <div className="flex justify-between items-center mt-2 mb-2">
          <Skeleton className="h-6 w-2/5 rounded-md bg-gray-200" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full bg-gray-200" />
            <Skeleton className="h-4 w-8 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="mb-2 border-t border-border" />

      <div className="flex items-center justify-between px-4 mb-4">
        <Skeleton className="h-6 w-20 rounded-md bg-gray-200" />
        <Skeleton className="h-12 w-28 rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}
