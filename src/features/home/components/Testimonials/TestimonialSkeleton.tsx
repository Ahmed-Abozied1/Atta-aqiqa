import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialSkeleton = () => {
    return (
        <div className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]! flex flex-col gap-6 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                    <Skeleton className="w-12 h-12 md:w-16 md:h-16 bg-bg rounded-full" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-24 h-4 md:w-32 md:h-5 bg-bg rounded-md" />
                        <Skeleton className="w-24 h-5 bg-bg rounded-sm" />
                    </div>
                </div>
            </div>
            <Skeleton className="w-full h-16 md:h-20 bg-bg rounded-md" />
        </div>
    );
};