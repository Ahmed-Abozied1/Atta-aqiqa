"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { RatingDistribution } from "../types/dashboard.types"

interface ServiceLevelCardProps {
  averageRating: number
  ratingDistribution: RatingDistribution
  totalReviews: number
  isLoading: boolean
}

const PRIMARY_COLOR = "#1B4935"
const LIGHT_GREEN = "#BBD8C9"

const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export default function ServiceLevelCard({
  averageRating,
  ratingDistribution,
  totalReviews,
  isLoading,
}: ServiceLevelCardProps) {
  const hasData = totalReviews > 0

  const percentage = useMemo(() => {
    if (!hasData) return 0
    return Math.round((averageRating / 5) * 100)
  }, [averageRating, hasData])

  const pieData = useMemo(
    () => [{ value: percentage }, { value: 100 - percentage }],
    [percentage]
  )

  const ratingData = useMemo(() => {
    if (!hasData) {
      return [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        percentage: 0,
      }))
    }

    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      percentage: calculatePercentage(
        ratingDistribution[stars as keyof RatingDistribution] || 0,
        totalReviews
      ),
    }))
  }, [ratingDistribution, totalReviews, hasData])

  return (
    <div className="p-6 bg-bg border border-bg rounded-2xl">
      <h5 className="text-medium-bold md:heading-5-bold text-title">
        مستوى الخدمة
      </h5>

      {/* Pie Section */}
      <div
        className="relative flex justify-center items-center"
        style={{ height: "300px", width: "333.33px", margin: "0 auto" }}
      >
        {isLoading || !hasData ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Skeleton className="bg-card h-35 w-35 rounded-full mb-4" />
            <Skeleton className="bg-card h-6 w-20 mb-2" />
            <Skeleton className="bg-card h-4 w-32" />
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id="pieGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5FA583" />
                    <stop offset="100%" stopColor="#1B4935" />
                  </linearGradient>
                </defs>

                <Pie
                  data={pieData}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={110}
                  outerRadius={140}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={40}
                >
                  <Cell fill="url(#pieGradient)" />
                  <Cell fill={LIGHT_GREEN} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div
              className="absolute"
              style={{
                width: "34px",
                height: "34px",
                backgroundColor: PRIMARY_COLOR,
                borderRadius: "50%",
                border: "4px solid white",
                top: "38%",
                right: "15%",
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
              <span className="heading-2 text-title mt-12.5">
                {percentage}%
              </span>
              <span className="text-paragraph heading-5-normal">
                بناءً على آراء العملاء
              </span>
            </div>
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex items-start justify-between gap-6">
        {/* Rating Summary */}
        {isLoading || !hasData ? (
          <div className="flex flex-col items-center text-center">
            <Skeleton className="bg-card h-8 w-16 mb-2" />

            <div className="flex gap-1.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded" />
              ))}
            </div>

            <Skeleton className="bg-card h-4 w-20" />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <span className="heading-2 text-title mb-1">
              {averageRating.toFixed(1)}
            </span>

            <div className="flex items-center gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={21.5}
                  fill={i <= Math.floor(averageRating) ? "#F4C430" : "#D1D8D7"}
                  color={i <= Math.floor(averageRating) ? "#F4C430" : "#D1D8D7"}
                />
              ))}
            </div>

            <span className="text-regular-normal text-paragraph">
              {totalReviews} تقييم
            </span>
          </div>
        )}

        {/* Rating Bars */}
        <div className="flex-1">
          {isLoading || !hasData
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 mb-2">
                  <Skeleton className="bg-card h-4 w-4" />
                  <Skeleton className="bg-card flex-1 h-2 rounded-full" />
                  <Skeleton className="bg-card h-4 w-8" />
                </div>
              ))
            : ratingData.map((item) => (
                <div key={item.stars} className="flex items-center gap-4">
                  <span className="text-medium-normal text-title">
                    {item.stars}
                  </span>

                  <div className="flex-1 h-2 bg-card rounded-full overflow-hidden my-2.25">
                    <div
                      className="h-full bg-[#F4C430] rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  <span className="text-small-normal text-paragraph">
                    {item.percentage}%
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}