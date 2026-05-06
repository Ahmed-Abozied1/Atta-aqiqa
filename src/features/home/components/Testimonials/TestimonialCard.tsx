import { cn } from '@/lib/utils'
import { TestimonialCardProps } from "../../types"
import { getInitials } from "@/lib/getInitials";
import { Star } from '@/components/ui/icons/Star';


export const TestimonialCard = ({ rating, comment, user }: TestimonialCardProps) => {
  return (
    <div className="h-full min-h-full bg-bg rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]! flex flex-col gap-6">      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-secondary/80 flex items-center justify-center py-3.25 md:py-2.5 px-5 md:px-3.75 text-bg heading-5-semibold">
            {getInitials(user?.name || "")}
          </div>
          <div>
            <h4 className="text-medium-bold md:text-large-bold text-title text-right mb-1 md:mb-2">{user?.name}</h4>
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
