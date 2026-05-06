// features/profile/common/components/ProfileSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="bg-card min-h-screen space-y-6 md:space-y-8 flex flex-col">
      <div className="hidden md:flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="flex flex-col items-center text-center">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="h-6 w-32 mt-4 mb-6" />
      </div>

      <div className="flex gap-2 md:gap-4">
        <Skeleton className="h-10 md:h-12 flex-1 md:w-32 rounded-lg" />
        <Skeleton className="h-10 md:h-12 flex-1 md:w-32 rounded-lg" />
      </div>

      <div className="md:bg-bg md:rounded-2xl md:p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1 md:w-32 rounded-xl" />
            <Skeleton className="h-12 flex-1 md:w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}