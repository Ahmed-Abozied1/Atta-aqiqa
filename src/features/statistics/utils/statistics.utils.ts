import { WeeklyDataPoint, RatingDistribution } from '../types/statistics.types'

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}

export const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0
  return Number(((current - previous) / previous * 100).toFixed(2))
}

export const formatWeeklyData = <T extends { createdAt: Date }>(
  items: T[],
  startDate: Date,
  days: string[]
): WeeklyDataPoint[] => {
  return days.map((day, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)
    const count = items.filter(item => 
      new Date(item.createdAt).toDateString() === date.toDateString()
    ).length
    return { name: day, users: count, bookings: count, purchases: 0 }
  })
}

export const getWeekDays = (): string[] => {
  return ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
}

export const getDateRange = () => {
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - 6)
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(now)
  endOfWeek.setHours(23, 59, 59, 999)

  const startOfLastWeek = new Date(startOfWeek)
  startOfLastWeek.setDate(startOfWeek.getDate() - 7)
  
  const endOfLastWeek = new Date(startOfWeek)
  endOfLastWeek.setDate(startOfWeek.getDate() - 1)
  endOfLastWeek.setHours(23, 59, 59, 999)

  return { startOfWeek, endOfWeek, startOfLastWeek, endOfLastWeek }
}

export const formatChartDataForStatCard = (weeklyData: WeeklyDataPoint[]) => {
  return weeklyData.map(item => ({
    name: item.name,
    total: item.users
  }))
}

export const formatOrdersChartData = (weeklyData: WeeklyDataPoint[]) => {
  return weeklyData.map(item => ({
    name: item.name,
    total: item.bookings
  }))
}

export const getRatingPercentage = (ratingCount: number, totalReviews: number): number => {
  if (totalReviews === 0) return 0
  return Math.round((ratingCount / totalReviews) * 100)
}