import { useState, useEffect, useCallback } from 'react'
import { homeService } from '../services'
import { Testimonial } from '../types'

interface UseTestimonialReturn {
  testimonials: Testimonial[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

let cachedTestimonials: Testimonial[] | null = null;

export function useTestimonial(): UseTestimonialReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(cachedTestimonials ?? [])
  const [loading, setLoading] = useState(cachedTestimonials === null)
  const [error, setError] = useState<Error | null>(null)

  const fetchTestimonials = useCallback(async (force = false) => {
    if (!force && cachedTestimonials !== null) {
      setTestimonials(cachedTestimonials);
      setLoading(false);
      return;
    }
    setLoading(true)
    setError(null)
    try {
      const data = await homeService.fetchTestimonials()
      cachedTestimonials = data || [];
      setTestimonials(cachedTestimonials)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (cachedTestimonials !== null) {
      setTestimonials(cachedTestimonials);
      setLoading(false);
    } else {
      fetchTestimonials();
    }
  }, [fetchTestimonials])

  return { testimonials, loading, error, refetch: () => fetchTestimonials(true) }
}