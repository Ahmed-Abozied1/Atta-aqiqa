import { Skeleton } from "@/components/ui/skeleton"

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] animate-pulse bg-[#FDFDFD] w-full">
      <Skeleton className="w-full h-36 md:h-52 rounded-none bg-gray-200" />

      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-1">
          <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-10 rounded-md bg-gray-200" />
        </div>
        <Skeleton className="h-5 w-3/5 rounded-md bg-gray-200" />
        <div className="border-t border-border" />
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-16 rounded-md bg-gray-200" />
          <Skeleton className="h-8 w-20 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
