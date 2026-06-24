"use client"

import { useState, useCallback } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ReturnType_useCardData } from "../hooks/useCardData"
import { Period } from "../types/dashboard.types"
import {
  CHART_GRID_COLOR,
  PERIOD_OPTIONS,
  PRIMARY_COLOR,
} from "../utils/dashboard.utils"

interface Props { cardData: ReturnType_useCardData }

export default function ProductTypesCard({ cardData }: Props) {
  const { period, productsData, isLoading, changePeriod } = cardData
  const [selectedBar, setSelectedBar] = useState(0)

  const handleBarHover = useCallback((_: unknown, index: number) => {
    setSelectedBar(index)
  }, [])

  // ✅ prevent "0" flicker
  const hasData = productsData && productsData.length > 0

  const totalOrders = hasData
    ? productsData.reduce((sum, d) => sum + d.value, 0)
    : null

  return (
    <div className="p-6 bg-bg border border-bg rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-1.25">
        <h5 className="text-medium-bold md:heading-5-bold text-title">
          أنواع المنتجات
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
        <div className="flex items-center gap-4">

      {isLoading || !hasData ? (
          <Skeleton className="h-6 w-24 rounded-md bg-card" />
      ) : (
          <span className="text-medium-bold md:heading-5-bold text-title">
            {totalOrders?.toLocaleString('en-US')}
          </span> 
      )}
  <span className="border border-success text-success px-2 py-1 rounded-2xl text-tiny-normal md:text-small-normal inline-block">
            عدد الطلبات
          </span>
                  </div>

      <div className="h-px bg-border w-full my-6" />

      {/* Chart */}
      <div className="h-88 w-full">
        {isLoading || !hasData ? (
          <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-lg bg-card" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productsData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              barSize={28}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke={CHART_GRID_COLOR}
              />

              <XAxis
                type="number"
                reversed
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#071110", fontSize: 14 }}
                domain={[0, 4000]}
                ticks={[0, 1000, 2000, 3000, 4000]}
                tickFormatter={(value) =>
                  value === 0 ? "0" : `${value / 1000}k`
                }
              />

              <YAxis
                dataKey="name"
                type="category"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#424645", fontSize: 14 }}
                width={10}
                dx={30}
              />

              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="relative bg-white shadow-xl border border-[#E3E7E5] rounded-lg p-2 px-4 mb-2">
                        <p className="text-sm text-[#111827] font-medium">
                          عدد الطلبات:
                          <span className="font-bold">
                            {payload[0].value?.toLocaleString('en-US')}
                          </span>
                        </p>
                        <div className="absolute -bottom-1.5 right-1/2 translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#E3E7E5] rotate-45"></div>
                      </div>
                    )
                  }
                  return null
                }}
                position={{ y: 55 }}
              />

              <Bar
                dataKey="value"
                radius={[4, 4, 4, 4]}
                onMouseEnter={handleBarHover}
              >
                {productsData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === selectedBar
                        ? PRIMARY_COLOR
                        : "#E2E8E4"
                    }
                    className="transition-colors duration-300"
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