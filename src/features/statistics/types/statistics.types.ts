export interface WeeklyDataPoint {
  name: string
  users: number
  bookings: number
  purchases: number
}

export interface ProductTypeData {
  name: string
  value: number
}

export interface RatingDistribution {
  1: number
  2: number
  3: number
  4: number
  5: number
  [key: number]: number
}

export interface Statistics {
  totalUsers: number
  totalOrders: number
  userGrowth: number
  orderGrowth: number
  weeklyUsersData: WeeklyDataPoint[]
  weeklyOrdersData: WeeklyDataPoint[]
  productTypesData: ProductTypeData[]
  averageRating: number
  ratingDistribution: RatingDistribution
  totalReviews: number
}