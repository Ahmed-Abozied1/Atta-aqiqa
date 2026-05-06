import prisma from "@/lib/prisma"
import { calculateGrowth, formatWeeklyData, getDateRange, getWeekDays } from "../utils/statistics.utils"
import { Statistics, ProductTypeData, RatingDistribution } from "../types/statistics.types"

export const StatisticsService = {
  async getProductTypesData(): Promise<ProductTypeData[]> {
    const orders = await prisma.order.groupBy({
      by: ['intent'],
      _count: {
        id: true
      }
    })

    const typeNames: Record<string, string> = {
      'SADAKA': 'صدقة',
      'AQEEQA': 'عقيقة',
      'NAZR': 'نذر',
      'ADHIYA': 'أضحية',
      'KAFFARA': 'كفارة يمين'
    }

    return orders.map(order => ({
      name: typeNames[order.intent] || order.intent,
      value: order._count.id
    }))
  },

  async getRatingStats() {
    const reviews = await prisma.review.aggregate({
      _avg: {
        rating: true
      },
      _count: {
        id: true
      }
    })

    const ratingDistributionRaw = await prisma.review.groupBy({
      by: ['rating'],
      _count: {
        id: true
      }
    })

    const distribution: RatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    ratingDistributionRaw.forEach(item => {
      if (item.rating !== null) {
        const rating = item.rating as keyof RatingDistribution
        distribution[rating] = item._count.id
      }
    })

    return {
      averageRating: reviews._avg.rating || 0,
      totalReviews: reviews._count.id,
      ratingDistribution: distribution
    }
  },

  async getBasicStats() {
    const { startOfWeek, endOfWeek, startOfLastWeek, endOfLastWeek } = getDateRange()
    const weekDays = getWeekDays()

    const [totalUsers, totalOrders, currentWeekUsers, lastWeekUsers, currentWeekOrders, lastWeekOrders, weeklyUsers, weeklyOrders] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.user.count({
        where: { createdAt: { gte: startOfWeek, lte: endOfWeek } }
      }),
      prisma.user.count({
        where: { createdAt: { gte: startOfLastWeek, lte: endOfLastWeek } }
      }),
      prisma.order.count({
        where: { createdAt: { gte: startOfWeek, lte: endOfWeek } }
      }),
      prisma.order.count({
        where: { createdAt: { gte: startOfLastWeek, lte: endOfLastWeek } }
      }),
      prisma.user.findMany({
        where: { createdAt: { gte: startOfWeek } },
        select: { createdAt: true }
      }),
      prisma.order.findMany({
        where: { createdAt: { gte: startOfWeek } },
        select: { createdAt: true }
      }),
    ])

    const weeklyUsersData = formatWeeklyData(weeklyUsers, startOfWeek, weekDays)
    const weeklyOrdersData = formatWeeklyData(weeklyOrders, startOfWeek, weekDays)

    return {
      totalUsers,
      totalOrders,
      userGrowth: calculateGrowth(currentWeekUsers, lastWeekUsers),
      orderGrowth: calculateGrowth(currentWeekOrders, lastWeekOrders),
      weeklyUsersData,
      weeklyOrdersData
    }
  },

  async getAllStatistics(): Promise<Statistics> {
    const [basicStats, productTypesData, ratingStats] = await Promise.all([
      this.getBasicStats(),
      this.getProductTypesData(),
      this.getRatingStats()
    ])

    return {
      ...basicStats,
      productTypesData,
      averageRating: ratingStats.averageRating,
      ratingDistribution: ratingStats.ratingDistribution,
      totalReviews: ratingStats.totalReviews
    }
  }
}