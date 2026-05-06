import { cn } from '@/lib/utils'

interface CarouselDotsProps {
  count: number
  activeIndex: number
  onDotClick: (index: number) => void
}

export const CarouselDots = ({ count, activeIndex, onDotClick }: CarouselDotsProps) => {
  return (
    <div className="flex justify-center gap-2 mt-10 md:mt-14">
      {Array.from({ length: count }).map((_, index) => {
        const isActive = activeIndex === index
        const isDisabled = count <= 1

        return (
          <button
            key={index}
            onClick={() => !isDisabled && onDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isDisabled}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              isActive ? "w-8 bg-[#A2B155]" : "w-2 bg-[#D9D9D9]",
              isDisabled && "cursor-none opacity-50"
            )}
          />
        )
      })}
    </div>
  )
}
