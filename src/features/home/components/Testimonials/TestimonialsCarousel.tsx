
import { Carousel } from '@/components/common/Carousel'
import { TestimonialCard } from './TestimonialCard'
import { TestimonialSkeleton } from './TestimonialSkeleton'
import { Testimonial } from '../../types'

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  loading?: boolean
}

export const TestimonialsCarousel = ({
  testimonials,
  loading,
}: TestimonialsCarouselProps) => {

  return (
 <Carousel
  items={testimonials}
  loading={loading}
  renderItem={(item) => (
    <div className="h-full">
      <TestimonialCard {...item} />
    </div>
  )}
  renderSkeleton={() => (
    <div className="h-full">
      <TestimonialSkeleton />
    </div>
  )}
/>

  )
}
