// components/admin/AdminProducts.tsx
"use client";

import { useCallback } from "react";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { AdminProductsTable } from "./AdminProductsTable";
import { useModalStore } from "@/store/useModalStore";
import { Product } from "../types/admin-products.types";
import { SkeletonTable } from "@/components/common/SkeletonTable";
import { AppButton } from "@/components/common/AppButton";

export default function AdminProducts() {
  const { products, isLoading, currentPage, totalPages, setCurrentPage, refetch, itemsPerPage } =
    useAdminProducts();

  const open = useModalStore((s) => s.open);

  const handleAddProduct = useCallback(
    () => open("ADMIN_PRODUCT_CREATE", { onSuccess: refetch }),
    [open, refetch]
  );

  const handleEdit = useCallback(
    (product: Product) => {
      console.log("Opening edit modal with product:", product);
      open("ADMIN_PRODUCT_EDIT", { product, onSuccess: refetch });
    },
    [open, refetch]
  );

  return (
    <div className="bg-card min-h-screen" dir="rtl">
      <h2 className="heading-5-bold md:heading-4-bold text-title mb-6 md:mb-8">إدارة المنتجات</h2>

      <div className="bg-bg rounded-2xl border border-card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div />
          <div className="flex flex-end">
            <AppButton onClick={handleAddProduct}>
              <Plus className="size-4 ml-2" />
              إضافة منتج
            </AppButton>
          </div>
        </div>

        {isLoading ? (
          <SkeletonTable columns={6} rows={10} />
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-paragraph">لا توجد منتجات</div>
        ) : (
          <AdminProductsTable
            products={products}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onEdit={handleEdit}
            onDeleteSuccess={refetch}
          />
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-card p-2 md:px-6 md:py-4 mt-4 md:mt-6">
            <span className="text-paragraph text-small-normal md:text-regular-normal">الصفحة {currentPage} من {totalPages}</span>

            <div className="flex gap-4">
              <AppButton
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg bg-disabled text-paragraph text-small-bold h-8! md:h-10! px-2! md:px-4! disabled:opacity-50"
              >
                <span className="hidden md:block">السابق</span>
                <ChevronRight className="block md:hidden size-4" />
              </AppButton>

              <AppButton
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg bg-primary text-small-bold h-8! md:h-10! px-2! md:px-4! text-bg disabled:opacity-50"
              >
                <span className="hidden md:block">التالي</span>
                <ChevronLeft className="block md:hidden size-4" />
              </AppButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}