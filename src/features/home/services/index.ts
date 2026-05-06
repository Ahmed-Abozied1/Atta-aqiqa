// features/home/services/home.service.ts
import { getData } from '@/lib/getData'
import { Product, Testimonial } from '../types'

interface ProductsResponse {
  data: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const homeService = {
  async fetchProducts(location: 'inside' | 'outside'): Promise<Product[]> {
    const query = `products?location=${location}`
    const response = await getData<ProductsResponse>(query)
    return response?.data || []
  },

  async fetchTestimonials(): Promise<Testimonial[]> {
    const response = await getData<Testimonial[]>('reviews')
    return response || []
  },
}