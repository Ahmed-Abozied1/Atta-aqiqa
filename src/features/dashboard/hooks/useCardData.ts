// features/dashboard/hooks/useCardData.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import { Period, WeeklyDataPoint, ProductTypesData } from "../types/dashboard.types"
import { dashboardService } from "../services/dashboard.service"

export function useCardData(initialPeriod: Period = "weekly") {
  const [period, setPeriod] = useState<Period>(initialPeriod)
  const [usersData, setUsersData] = useState<WeeklyDataPoint[]>([])
  const [ordersData, setOrdersData] = useState<WeeklyDataPoint[]>([])
  const [productsData, setProductsData] = useState<ProductTypesData[]>([])
  const [userGrowth, setUserGrowth] = useState(0)
  const [orderGrowth, setOrderGrowth] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCardData = useCallback(async (selectedPeriod: Period) => {
    setIsLoading(true)
    try {
      const data = await dashboardService.getCardData(selectedPeriod)
      setUsersData(data.weeklyUsers)
      setOrdersData(data.weeklyOrders)
      setProductsData(data.productTypes)
      setUserGrowth(data.userGrowth)
      setOrderGrowth(data.orderGrowth)
    } catch (error) {
      console.error("Failed to fetch card data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCardData(period)
  }, [period, fetchCardData])

  const changePeriod = useCallback((newPeriod: Period) => {
    setPeriod(newPeriod)
  }, [])

  return {
    period,
    usersData,
    ordersData,
    productsData,
    userGrowth,
    orderGrowth,
    isLoading,
    changePeriod,
  }
}