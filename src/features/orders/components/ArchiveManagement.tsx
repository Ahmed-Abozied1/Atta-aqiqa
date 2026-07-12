"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import { useOrders } from "../hooks/useOrders"
import { OrdersTable } from "./OrdersTable"
import { SkeletonTable } from "@/components/common/SkeletonTable"

export default function ArchiveManagement() {
  const {
    orders,
    isLoading,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    deleteOrder,
    loadingId,
  } = useOrders(true)

  return (
    <div className="bg-card min-h-screen" dir="rtl">
      <div className="flex items-center justify-between mb-6 md:mb-8 flex-wrap gap-3">
        <h2 className="heading-5-bold md:heading-4-bold text-title">أرشيف الطلبات</h2>
        <Link href="/admin/orders">
          <Button variant="outline" className="gap-2">
            <ArrowRight size={16} />
            <span>العودة للطلبات</span>
          </Button>
        </Link>
      </div>

      <div className="bg-bg rounded-2xl border border-card p-4 md:p-6">
        {isLoading ? (
          <SkeletonTable columns={9} rows={10} />
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-paragraph">
            <p className="text-lg font-medium">الأرشيف فارغ</p>
            <p className="text-sm mt-2">لا توجد طلبات مؤرشفة حتى الآن</p>
          </div>
        ) : (
          <OrdersTable
            orders={orders}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onEdit={() => {}}
            onDelete={deleteOrder}
            loadingId={loadingId}
            isArchiveMode={true}
          />
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-card p-2 md:px-6 md:py-4 mt-4 md:mt-6">
            <span className="text-paragraph text-small-normal md:text-regular-normal">
              الصفحة {currentPage} من {totalPages}
            </span>
            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg bg-disabled text-paragraph text-small-bold h-8! md:h-10! px-2! md:px-4! disabled:opacity-50"
              >
                <span className="hidden md:block">السابق</span>
                <ChevronRight className="block md:hidden size-4" />
              </Button>
              <Button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg bg-primary text-small-bold h-8! md:h-10! px-2! md:px-4! text-bg disabled:opacity-50"
              >
                <span className="hidden md:block">التالي</span>
                <ChevronLeft className="block md:hidden size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
