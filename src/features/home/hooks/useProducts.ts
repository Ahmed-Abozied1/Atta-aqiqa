// features/home/hooks/useProducts.ts
import { useState, useEffect, useCallback } from 'react'
import { homeService } from '../services'
import { Product } from '../types'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useProducts(activeTab: 'inside' | 'outside'): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await homeService.fetchProducts(activeTab)
      setProducts(data || [])
    } catch (err) {
      setError(err as Error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [activeTab])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}