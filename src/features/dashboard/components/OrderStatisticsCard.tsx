"use client"

import { useCardData } from "../hooks/useCardData"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  CHART_GRID_COLOR,
  PERIOD_OPTIONS,
} from "../utils/dashboard.utils"
import { Period } from "../types/dashboard.types"

export default function OrderStatisticsCard() {
  const { period, ordersData, orderGrowth, isLoading, changePeriod } = useCardData()

  // التحقق من وجود بيانات (الـ API يرجع مصفوفة دائماً، لذا نفحص الطول)
  const hasData = ordersData && ordersData.length > 0 && ordersData.some(d => d.bookings > 0 || d.purchases > 0)

  const totalOrders = ordersData?.reduce((sum, d) => sum + d.bookings + d.purchases, 0) 
  const isPositive = (orderGrowth || 0) >= 0

  return (
    <div className="p-6 bg-bg border border-border rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-medium-bold md:heading-5-bold text-title">إجمالي الطلبات</h5>
        <Select value={period} onValueChange={(v) => changePeriod(v as Period)} dir="rtl">
          <SelectTrigger className="h-10 px-4 flex items-center border-[1.5px] border-primary rounded-lg text-primary">
            <SelectValue placeholder="أسبوعي" />
          </SelectTrigger>
          <SelectContent className="bg-bg border-border">
            {PERIOD_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats & Legend */}
      <div className="flex justify-between flex-wrap items-center gap-4 mb-6">
        {isLoading ?(
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-24 rounded-md bg-card" />
          <Skeleton className="h-6 w-16 rounded-full bg-card" />
        </div>
      )  : (
          <div className="flex items-center gap-3">
            <span className="text-medium-bold md:heading-5-bold text-title">{totalOrders.toLocaleString()}</span>
            <span className={`border px-2 py-1 rounded-2xl text-tiny-normal ${isPositive ? "border-success text-success" : "border-error text-error"}`}>
              {isPositive ? "+" : ""}{orderGrowth || 0}%
            </span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-small-bold text-title">حجوزات</span>
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-small-bold text-title">مشتريات</span>
            <div className="w-3 h-3 rounded-full bg-secondary" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-lg bg-card" />
        ) : !hasData ? (
          <div className="w-full h-full flex items-center justify-center text-paragraph border-2 border-dashed border-border rounded-xl">
            لا توجد بيانات متاحة لهذه الفترة
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ordersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={PRIMARY_COLOR} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={SECONDARY_COLOR} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={SECONDARY_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={CHART_GRID_COLOR} />
              <XAxis dataKey="name" reversed tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis orientation="right" tick={{ fill: "#424645", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-white shadow-xl border border-border rounded-xl p-3 text-right" dir="rtl">
                        <p className="text-xs font-bold mb-2 text-title">{payload[0].payload.name}</p>
                        {payload.map((entry, i) => (
                          <div key={i} className="flex justify-between gap-6 text-xs mb-1">
                            <span style={{ color: entry.color }}>{entry.name === 'bookings' ? 'حجوزات' : 'مشتريات'}:</span>
                            <span className="font-bold">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area type="monotone" dataKey="bookings" stroke={PRIMARY_COLOR} strokeWidth={2.5} fill="url(#colorBookings)" />
              <Area type="monotone" dataKey="purchases" stroke={SECONDARY_COLOR} strokeWidth={2.5} fill="url(#colorPurchases)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}