// features/dashboard/components/StatCard.tsx
"use client"

import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface StatCardProps {
    title: string
    value: string
    percentage: string
    icon: React.ReactNode
    data: { name: string; total: number }[]
    isLoading?: boolean
}

export function StatCard({ title, value, percentage, icon, data, isLoading }: StatCardProps) {
    const isPositive = percentage.startsWith('+')
    
    return (
        <div className="flex-1 h-full p-2 md:p-4 lg:p-6 flex flex-col md:flex-row justify-between md:items-center flex-wrap gap-2 rounded-xl md:rounded-none bg-bg md:bg-transparent">
            <div className="space-y-2">
                <h5 className="text-medium-bold md:heading-5-bold text-title">{title}</h5>

                <div className="flex items-center gap-2 md:gap-4 text-title">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-card rounded-full flex items-center justify-center">
                        {icon}
                    </div>

                   {isLoading ? (
  <div className="flex items-center gap-3">
    <Skeleton className="h-5  w-10 md:w-14 rounded-md bg-card" />
    <Skeleton className="h-5 w-10 md:w-20 rounded-full bg-card" />
  </div>
) : (
  <>
    <span className="text-regular-bold md:heading-6-bold">
      {value}
    </span>

    <span
      className={`border ${
        isPositive
          ? "border-success text-success"
          : "border-error text-error"
      } px-2 py-1 rounded-2xl text-tiny-normal md:text-small-normal block`}
    >
      {percentage}
    </span>
  </>
)}
                </div>

                <p className="text-tiny-normal md:text-regular-normal text-paragraph">
                    مقارنة بالأسبوع الماضي
                </p>
            </div>

            <div className="w-full md:w-45 h-20.25 md:h-24.25 rounded-[3px]">
                {isLoading ? (
                    <Skeleton className="w-full h-full rounded-lg bg-card" />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="-84.16%" stopColor="#1F8A3D" />
                                    <stop offset="100%" stopColor="#E9F7EF" />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" hide={true} />
                            <YAxis hide={true} domain={['auto', 'auto']} />
                            <Tooltip 
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white shadow-lg border border-border rounded-lg p-2 px-3">
                                                <p className="text-small-normal text-paragraph">
                                                    {payload[0].value?.toLocaleString()}
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                                cursor={{ stroke: '#1F8A3D', strokeWidth: 1 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#1F8A3D"
                                strokeWidth={2}
                                fill="url(#colorGreen)"
                                dot={false}
                                isAnimationActive={true}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}