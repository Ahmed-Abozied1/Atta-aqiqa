import { useState, useEffect, useCallback, useRef } from 'react'
import { homeService } from '../services'
import { Product } from '../types'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

const cache = new Map<string, Product[]>()

export function useProducts(activeTab: 'inside' | 'outside'): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>(() => cache.get(activeTab) || [])
  const [loading, setLoading] = useState(!cache.has(activeTab))
  const [error, setError] = useState<Error | null>(null)
  const activeTabRef = useRef(activeTab)

  const fetchProducts = useCallback(async (tab: 'inside' | 'outside', force = false) => {
    if (!force && cache.has(tab)) {
      setProducts(cache.get(tab)!)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await homeService.fetchProducts(tab)
      const result = data || []
      cache.set(tab, result)
      if (activeTabRef.current === tab) {
        setProducts(result)
      }
    } catch (err) {
      if (activeTabRef.current === tab) {
        setError(err as Error)
        setProducts([])
      }
    } finally {
      if (activeTabRef.current === tab) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    activeTabRef.current = activeTab
    if (cache.has(activeTab)) {
      setProducts(cache.get(activeTab)!)
      setLoading(false)
    } else {
      fetchProducts(activeTab)
    }
  }, [activeTab, fetchProducts])

  return { products, loading, error, refetch: () => fetchProducts(activeTab, true) }
}
