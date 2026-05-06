import { DashboardStatistics, Period, CardData } from "../types/dashboard.types"

export const dashboardService = {
  getStats: async (): Promise<DashboardStatistics> => {
    const response = await fetch(`/api/statistics`, {
      method: "GET",
      cache: "no-store",
    })

    if (!response.ok) {
      let message = "Failed to fetch dashboard statistics"
      try {
        const errorData = await response.json()
        message = errorData?.error || message
      } catch {}
      throw new Error(message)
    }

    return response.json()
  },

  getCardData: async (period: Period): Promise<CardData> => {
    const response = await fetch(`/api/statistics/card-data?period=${period}`, {
      method: "GET",
      cache: "no-store",
    })

    if (!response.ok) {
      let message = "Failed to fetch card data"
      try {
        const errorData = await response.json()
        message = errorData?.error || message
      } catch {}
      throw new Error(message)
    }

    return response.json()
  },
}