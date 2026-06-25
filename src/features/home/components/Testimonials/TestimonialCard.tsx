import { cn } from '@/lib/utils'
import { TestimonialCardProps } from "../../types"
import { getInitials } from "@/lib/getInitials";
import { Star } from '@/components/ui/icons/Star';

export const TestimonialCard = ({ rating, comment, name, image, user }: TestimonialCardProps) => {
  const displayName = name || user?.name || "";
  const displayImage = image || user?.image || null;

  return (
    <div className="h-full min-h-full bg-bg rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]! flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {displayImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayImage}
              alt={displayName}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-secondary/80 flex items-center justify-center text-bg heading-5-semibold shrink-0">
              {getInitials(displayName)}
            </div>
          )}
          <div>
            <h4 className="text-medium-bold md:text-large-bold text-gray-900 text-right mb-1 md:mb-2">{displayName}</h4>
            <div className="flex items-center gap-[4.83px] md:gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < rating ? "fill-rating text-rating" : "fill-disabled text-disabled"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-paragraph text-small-normal md:text-medium-normal flex-1">
        " {comment} "
      </p>
    </div>
  )
}
