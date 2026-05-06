"use client"

import { useState, useEffect, useCallback } from "react"
import { Statistics } from "../types/statistics.types"
import { toast } from "sonner"

export function useStatistics() {
  const [stats, setStats] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatistics = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/statistics')
      if (!response.ok) throw new Error('Failed to fetch statistics')
      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load statistics')
      toast.error('حدث خطأ في تحميل الإحصائيات')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatistics()
  }, [fetchStatistics])

  return { stats, loading, error, refetch: fetchStatistics }
}