"use client"

import OrderStatisticsCard from "./OrderStatisticsCard"
import StatsOverview from "./StatsOverview"
import UserStatisticsCard from "./UserStatisticsCard"
import { useDashboard } from "../hooks/useDashboard"
import ProductTypesCard from "./ProductTypesCard"
import ServiceLevelCard from "./ServiceLevelCard"

export default function AdminDashboard() {
  const { stats, isLoading } = useDashboard()

  return (
    <div className="bg-card min-h-screen" dir="rtl">
      <StatsOverview 
        totalUsers={stats?.totalUsers} 
        totalOrders={stats?.totalOrders}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        <UserStatisticsCard />
        <OrderStatisticsCard />
        <ProductTypesCard />
        <ServiceLevelCard 
          averageRating={stats?.averageRating || 0}
          ratingDistribution={stats?.ratingDistribution || {1:0,2:0,3:0,4:0,5:0}}
          totalReviews={stats?.totalReviews || 0}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}