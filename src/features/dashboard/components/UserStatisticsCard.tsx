"use client"

import { useCardData } from "../hooks/useCardData"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
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
  CHART_GRID_COLOR,
  PERIOD_OPTIONS,
} from "../utils/dashboard.utils"
import { Period } from "../types/dashboard.types"

export default function UserStatisticsCard() {
  const { period, usersData, userGrowth, isLoading, changePeriod } = useCardData()

  const hasData = usersData && usersData.length > 0

  const totalUsers = hasData
    ? usersData.reduce((sum, d) => sum + d.users, 0)
    : null

  const growthValue = userGrowth || 0
  const isPositive = growthValue >= 0

  return (
    <div className="p-6 bg-bg border border-bg rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-1.25">
        <h5 className="text-medium-bold md:heading-5-bold text-title">
          إجمالي المستخدمين
        </h5>

        <Select
          value={period}
          onValueChange={(v) => changePeriod(v as Period)}
          dir="rtl"
        >
          <SelectTrigger className="h-10 px-4 flex items-center justify-between border-[1.5px] border-primary rounded-lg text-small-bold! text-primary">
            <SelectValue placeholder="أسبوعي" />
          </SelectTrigger>

          <SelectContent
            side="bottom"
            sideOffset={4}
            className="bg-bg border-border text-paragraph text-small-normal"
          >
            {PERIOD_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      {isLoading || !hasData ? (
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-24 rounded-md bg-card" />
          <Skeleton className="h-6 w-16 rounded-full bg-card" />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-medium-bold md:heading-5-bold text-title">
            {totalUsers?.toLocaleString()}
          </span>

          <span
            className={`border px-2 py-1 rounded-2xl text-tiny-normal md:text-small-normal inline-block ${
              isPositive
                ? "border-success text-success"
                : "border-error text-error"
            }`}
          >
            {isPositive ? "+" : ""}
            {growthValue}%
          </span>
        </div>
      )}

      <div className="h-px bg-border w-full my-6" />

      {/* Chart */}
      <div className="h-75.75 w-full">
        {isLoading || !hasData ? (
          <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-lg bg-card" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usersData} margin={{ bottom: 10 }}>
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke={CHART_GRID_COLOR}
              />

              <ReferenceLine y={0} stroke={CHART_GRID_COLOR} strokeWidth={1} />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 14, dy: 18 }}
                reversed={true}
                interval={0}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                orientation="right"
                width={29}
                dx={20}
                domain={[0, "auto"]}
                tick={{ fill: "#424645", fontSize: 14 }}
                tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}k`)}
              />

              <Tooltip
                cursor={{ fill: "transparent" }}
                position={{ y: 20 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="relative mb-2 flex flex-col items-center">
                        <div className="bg-bg px-2.5 py-2.75 text-title text-small-medium rounded-lg">
                          عدد المستخدمين:
                          <span className="text-small-normal">
                            {payload[0].value?.toLocaleString()}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-bg -z-10"></div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              <Bar dataKey="users" radius={[4, 4, 0, 0]} barSize={24}>
                {usersData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === usersData.length - 1
                        ? PRIMARY_COLOR
                        : "#DCEBE3"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}