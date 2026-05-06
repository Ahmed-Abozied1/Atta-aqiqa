"use client"

import { Loader2 } from "lucide-react"

export function AccountsLoading() {
  return (
    <div className="bg-card min-h-screen p-4 md:p-8 flex items-center justify-center" dir="rtl">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-12 animate-spin text-primary" />
        <p className="text-paragraph">جاري تحميل المستخدمين...</p>
      </div>
    </div>
  )
}