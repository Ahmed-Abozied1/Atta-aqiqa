// features/dashboard/hooks/useDashboard.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import { DashboardStatistics } from "../types/dashboard.types"
import { dashboardService } from "../services/dashboard.service"

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await dashboardService.getStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  }
}