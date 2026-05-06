import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="bg-card min-h-screen p-4 md:p-8" dir="rtl">
      <div className="mb-6 md:mb-8">
        <Skeleton className="bg-ca h-8 w-48 mb-6 md:mb-8" />
        
        <div className="bg-transparent md:bg-bg border-0 md:border border-card rounded-0 md:rounded-2xl p-0 md:p-4 flex justify-between gap-2 md:gap-0">
          <div className="flex-1 border-0 md:border-l border-border p-2 md:p-6">
            <Skeleton className="bg-ca h-6 w-32 mb-4" />
            <div className="flex items-center gap-2 md:gap-4">
              <Skeleton className="bg-ca w-8 md:w-10 h-8 md:h-10 rounded-full" />
              <Skeleton className="bg-ca h-8 w-24" />
              <Skeleton className="bg-ca h-6 w-16 rounded-2xl" />
            </div>
            <Skeleton className="bg-ca h-4 w-40 mt-2" />
            <div className="w-full md:w-45 h-20.25 md:h-24.25 mt-4">
              <Skeleton className="bg-ca w-full h-full" />
            </div>
          </div>
          
          <div className="flex-1 p-2 md:p-6">
            <Skeleton className="bg-ca h-6 w-32 mb-4" />
            <div className="flex items-center gap-2 md:gap-4">
              <Skeleton className="bg-ca w-8 md:w-10 h-8 md:h-10 rounded-full" />
              <Skeleton className="bg-ca h-8 w-24" />
              <Skeleton className="bg-ca h-6 w-16 rounded-2xl" />
            </div>
            <Skeleton className="bg-ca h-4 w-40 mt-2" />
            <div className="w-full md:w-45 h-20.25 md:h-24.25 mt-4">
              <Skeleton className="bg-ca w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Skeleton className="bg-ca p-6 h-[500px] rounded-2xl" />
        <Skeleton className="bg-ca p-6 h-[500px] rounded-2xl" />
        <Skeleton className="bg-ca p-6 h-[500px] rounded-2xl" />
        <Skeleton className="bg-ca p-6 h-[500px] rounded-2xl" />
      </div>
    </div>
  )
}