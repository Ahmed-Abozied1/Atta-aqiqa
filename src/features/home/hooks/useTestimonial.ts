import { useState, useEffect, useCallback } from 'react'
import { homeService } from '../services'
import { Testimonial } from '../types'

interface UseTestimonialReturn {
  testimonials: Testimonial[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useTestimonial(): UseTestimonialReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTestimonials = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await homeService.fetchTestimonials()
      if (data) {
        setTestimonials(data)
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  return { testimonials, loading, error, refetch: fetchTestimonials }
}