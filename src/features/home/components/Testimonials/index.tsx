'use client'

import { SectionHeader } from '@/components/common/SectionHeader'
import { TestimonialsCarousel } from './TestimonialsCarousel'
import { ErrorMessage } from '@/components/common/ErrorMessage'

interface TestimonialsProps {
  testimonials: any[]
  loading: boolean
  error: any
  refetch: () => void
}

export function Testimonials({ testimonials, loading, error, refetch }: TestimonialsProps) {
  if (!loading && testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-24 overflow-hidden container bg-bg" id="testimonials">
      <SectionHeader
        badge="آراء نفتخر بها"
        title="ماذا يقول عملاؤنا"
        description="آراء عملاؤنا الكرام حول سهولة الحجز وجودة الذبائح وخدمة التنفيذ ."
      />

      <div className="relative mt-8 md:mt-12">
        {error && (
          <ErrorMessage
            message="عذرًا، حدث خطأ أثناء جلب البيانات."
            onRetry={refetch}
          />
        )}

        <TestimonialsCarousel
          testimonials={testimonials}
          loading={loading}
        />
      </div>
    </section>
  )
}