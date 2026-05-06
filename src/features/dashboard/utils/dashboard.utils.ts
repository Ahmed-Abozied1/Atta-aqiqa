export const PRIMARY_COLOR = "#1B4935"
export const SECONDARY_COLOR = "#A1B455"
export const CHART_GRID_COLOR = "#E5E7EB"

export const PERIOD_OPTIONS = [
  { value: "weekly", label: "أسبوعي" },
  { value: "monthly", label: "شهري" },
  { value: "yearly", label: "سنوي" },
]

export const formatNumber = (num?: number): string => {
  if (num === undefined || num === null) return ""

  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toLocaleString()
}

export const formatGrowthPercentage = (value: number): string => {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}