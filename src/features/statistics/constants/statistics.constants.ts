export const WEEK_DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] as const;

export const CHART_COLORS = {
  PRIMARY: "#1B4935",
  SECONDARY: "#A1B455",
  SUCCESS: "#1F8A3D",
  WARNING: "#F4C430",
  LIGHT_GREEN: "#BBD8C9",
  GRID: "#E3E7E5",
  TEXT: "#424645",
  TEXT_LIGHT: "#9CA3AF",
} as const;

export const PERIOD_OPTIONS = [
  { value: "weekly", label: "أسبوعي" },
  { value: "monthly", label: "شهري" },
  { value: "yearly", label: "سنوي" },
] as const;

export type PeriodType = typeof PERIOD_OPTIONS[number]["value"];