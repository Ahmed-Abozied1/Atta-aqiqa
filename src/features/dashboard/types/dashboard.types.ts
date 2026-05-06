// features/dashboard/types/dashboard.types.ts
export type Period = "weekly" | "monthly" | "yearly"

export interface WeeklyDataPoint {
  name: string
  users: number
  bookings: number
  purchases: number
}

export interface ProductTypesData {
  name: string
  value: number
}

export interface RatingDistribution {
  1: number
  2: number
  3: number
  4: number
  5: number
}

export interface DashboardStatistics {
  totalUsers: number
  totalOrders: number
  averageRating: number
  totalReviews: number
  ratingDistribution: RatingDistribution
}

export interface CardData {
  weeklyUsers: WeeklyDataPoint[]
  weeklyOrders: WeeklyDataPoint[]
  productTypes: ProductTypesData[]
  userGrowth: number
  orderGrowth: number
}