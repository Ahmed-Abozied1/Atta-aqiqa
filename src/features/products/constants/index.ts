export const INTENTIONS = [
  { id: "AQEEQA", label: "عقيقة" },
    { id: "SADAKA", label: "صدقة" },
  { id: "NAZR", label: "نذر" },
  { id: "KAFFARA", label: "كفارة يمين" },
  { id: "ADHIYA", label: "أضحية عيد الاضحي" },
] as const;

export const INTENT_LABELS: Record<string, string> = {
  SADAKA: "صدقة",
  AQEEQA: "عقيقة",
  NAZR: "نذر",
  ADHIYA: "أضحية",
  KAFFARA: "كفارة يمين",
  BUY: "شراء",

};

export const PART_LABELS: Record<number, string> = {
  1: "الأول",
  2: "الثاني",
  3: "الثالث",
  4: "الرابع",
  5: "الخامس",
  6: "السادس",
};



export const BOOKING_STEPS = [
  { id: 1, label: "البيانات" },
  { id: 2, label: "ملخص الطلب" },
  { id: 3, label: "إتمام الحجز" }
];