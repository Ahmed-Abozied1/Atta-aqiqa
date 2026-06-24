// features/dashboard/components/StatsOverview.tsx
"use client"

import { Users, ShoppingCart } from "lucide-react"
import { StatCard } from "./StatCard"
import { formatNumber } from "../utils/dashboard.utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ReturnType_useCardData } from "../hooks/useCardData"

interface StatsOverviewProps {
  totalUsers?: number
  totalOrders?: number
  isLoading?: boolean
  cardData: ReturnType_useCardData
}

export default function StatsOverview({ totalUsers, totalOrders, isLoading, cardData }: StatsOverviewProps) {
  const { usersData, ordersData, userGrowth, orderGrowth, isLoading: cardLoading } = cardData

  const showLoading = isLoading || cardLoading

  const userChartData = usersData.map(item => ({
    name: item.name,
    total: item.users,
  }))

  const ordersChartData = ordersData.map(item => ({
    name: item.name,
    total: item.bookings,
  }))

  const userGrowthValue = userGrowth || 0
  const orderGrowthValue = orderGrowth || 0

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="heading-4-bold text-title mb-6 md:mb-8">لوحة التحكم</h3>

<div className="bg-transparent md:bg-bg border-0 md:border border-card rounded-0 md:rounded-2xl p-0 md:p-2 lg:p-4 flex items-stretch justify-between gap-2 md:gap-0">        <div className="flex-1 border-0 md:border-l border-border">
          <StatCard
            title="إجمالي المستخدمين"
            value={formatNumber(totalUsers)}
            percentage={userGrowthValue >= 0 ? `+${userGrowthValue}%` : `${userGrowthValue}%`}
            icon={<Users size={20} />}
            data={userChartData}
            isLoading={showLoading}
          />
        </div>

        <div className="flex-1">
          <StatCard
            title="إجمالي الطلبات"
            value={formatNumber(totalOrders)}
            percentage={orderGrowthValue >= 0 ? `+${orderGrowthValue}%` : `${orderGrowthValue}%`}
            icon={<ShoppingCart size={20} />}
            data={ordersChartData}
            isLoading={showLoading}
          />
        </div>
      </div>
    </div>
  )
}