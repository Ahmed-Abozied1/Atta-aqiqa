"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Archive } from "lucide-react";
import { Order } from "../types/orders.types";
import { formatOrderDate, getIntentLabel } from "../utils/orders.utils";
import { STATUS_COLORS, STATUS_LABELS } from "../constants";
import { AppButton } from "@/components/common/AppButton";
import { cn } from "@/lib/utils";

interface OrdersTableProps {
  orders: Order[];
  currentPage: number;
  itemsPerPage: number;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
  loadingId?: string | null;
  isArchiveMode?: boolean;
}

export function OrdersTable({
  orders,
  currentPage,
  itemsPerPage,
  onEdit,
  onDelete,
  loadingId,
  isArchiveMode = false,
}: OrdersTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div className="w-full" dir="rtl">
      <div className="w-full">
        <Table className="w-full hidden md:table table-fixed">
          <TableHeader className="bg-card">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-10 py-3 text-center">
                <span className="text-secondary font-bold text-sm">#</span>
              </TableHead>
              <TableHead className="w-[14%] py-3 text-center font-bold text-title text-sm">اسم العميل</TableHead>
              <TableHead className="w-[12%] py-3 text-center font-bold text-title text-sm">رقم الهاتف</TableHead>
              <TableHead className="w-[7%] py-3 text-center font-bold text-title text-sm">المكان</TableHead>
              <TableHead className="w-[12%] py-3 text-center font-bold text-title text-sm">نوع الذبيحة</TableHead>
              <TableHead className="w-[5%] py-3 text-center font-bold text-title text-sm">العدد</TableHead>
              <TableHead className="w-[8%] py-3 text-center font-bold text-title text-sm">نوع الحجز</TableHead>
              <TableHead className="w-[10%] py-3 text-center font-bold text-title text-sm">الحالة</TableHead>
              <TableHead className="w-[10%] py-3 text-center font-bold text-title text-sm">التاريخ</TableHead>
              {!isArchiveMode && (
                <TableHead className="w-[10%] py-3 text-center font-bold text-title text-sm">استلام</TableHead>
              )}
              <TableHead className="w-10 py-3 text-center font-bold text-title text-sm">
                {isArchiveMode ? "حذف" : "أرشيف"}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.id}
                className="border-b border-border h-14! text-paragraph! text-center"
              >
                <TableCell className="text-center px-1">
                  <span className={`text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center mx-auto text-white ${
                    order.status === "RECEIVED" ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </span>
                </TableCell>

                <TableCell className="text-sm font-semibold px-1 truncate max-w-0">
                  <span className="block truncate">{order.beneficiaryName || "زائر"}</span>
                </TableCell>
                <TableCell className="text-sm font-medium px-1" dir="ltr">{order.phone}</TableCell>
                <TableCell className="text-sm font-medium px-1 text-center">
                  {order.product?.location === "INSIDE_EGYPT" ? "مصر" : "أفريقيا"}
                </TableCell>
                <TableCell className="text-sm font-medium px-1 truncate max-w-0">
                  <span className="block truncate">{order.product?.name}</span>
                </TableCell>
                <TableCell className="text-sm font-bold px-1 text-center">{order.quantity ?? 1}</TableCell>
                <TableCell className="text-sm font-medium px-1 text-center">{getIntentLabel(order.intent)}</TableCell>
                <TableCell className="px-1">
                  <span className={cn(
                    STATUS_COLORS[order.status],
                    "px-2 py-1 rounded-full text-xs font-bold flex items-center justify-center w-fit mx-auto whitespace-nowrap"
                  )}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </TableCell>
                <TableCell className="text-sm font-medium px-2 text-center whitespace-nowrap">
                  {formatOrderDate(order.createdAt)}
                </TableCell>
                {!isArchiveMode && (
                  <TableCell className="px-2 text-center">
                    <button
                      onClick={() => onEdit(order)}
                      disabled={order.status === "RECEIVED" || loadingId === order.id}
                      className="w-7 h-7 rounded-md bg-[#1D4734] hover:bg-[#153627] text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer mx-auto flex items-center justify-center"
                    >
                      {loadingId === order.id ? "·" : "✓"}
                    </button>
                  </TableCell>
                )}
                <TableCell className="text-center px-1">
                  <button
                    onClick={() => setConfirmId(order.id)}
                    disabled={loadingId === order.id}
                    className={cn(
                      "p-1 rounded-lg disabled:opacity-40 transition-all cursor-pointer mx-auto flex items-center justify-center",
                      isArchiveMode
                        ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                        : "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                    )}
                  >
                    {isArchiveMode ? <Trash2 size={16} /> : <Archive size={16} />}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
        <DialogContent dir="rtl" className="max-w-sm rounded-2xl p-0 overflow-hidden bg-white">
          <div className="flex flex-col items-center gap-4 px-6 pt-8 pb-2 text-center">
            <div className={cn("p-4 rounded-full", isArchiveMode ? "bg-red-100" : "bg-amber-100")}>
              {isArchiveMode
                ? <Trash2 size={28} className="text-red-500" />
                : <Archive size={28} className="text-amber-600" />
              }
            </div>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-title">
                {isArchiveMode ? "تأكيد الحذف النهائي" : "تأكيد الأرشفة"}
              </DialogTitle>
            </DialogHeader>
            <p className="text-paragraph text-sm leading-relaxed">
              {isArchiveMode
                ? <>هل أنت متأكد من حذف هذا الطلب نهائياً؟<br /><span className="text-red-500 font-medium">لا يمكن التراجع عن هذا الإجراء.</span></>
                : "سيتم نقل هذا الطلب إلى الأرشيف ويمكنك استعراضه لاحقاً."
              }
            </p>
          </div>
          <DialogFooter className="flex flex-row-reverse gap-2 px-6 py-4 border-t border-border mt-2">
            <Button
              className={cn(
                "flex-1 rounded-xl text-white cursor-pointer",
                isArchiveMode ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"
              )}
              onClick={() => { onDelete(confirmId!); setConfirmId(null); }}
            >
              {isArchiveMode ? "نعم، احذف نهائياً" : "نعم، أرشف"}
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl cursor-pointer" onClick={() => setConfirmId(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile View */}
      <div className="md:hidden mt-4">
        <div className="flex items-center bg-card py-4 px-2 rounded-xl">
          <span className="text-secondary heading-6-bold block w-8 text-center">#</span>
          <span className="text-title text-regular-bold mr-2">اسم العميل</span>
        </div>

        {orders.map((order, index) => (
          <div key={order.id} className="border-b border-border px-2">
            <div className="flex items-center py-2 h-14">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                order.status === "RECEIVED" ? "bg-green-500" : "bg-red-500"
              }`}>
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </span>
              <span className="text-title mr-2 font-semibold">
                {order.beneficiaryName || "زائر"}
              </span>
            </div>

            <div className="mr-8 pb-2 space-y-2">
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">رقم الهاتف</span>
                <span className="text-small-normal text-paragraph" dir="ltr">{order.phone}</span>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">نوع الذبيحة</span>
                <span className="text-small-normal text-paragraph">{order.product?.name}</span>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">عدد الذبائح</span>
                <span className="text-small-normal text-paragraph">{order.quantity ?? 1}</span>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">الحالة</span>
                <span className={cn("px-2 py-1.25 rounded-full text-small-bold h-8 block", STATUS_COLORS[order.status])}>
                  {STATUS_LABELS[order.status]}
                </span>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">التاريخ</span>
                <span className="text-small-normal text-paragraph">{formatOrderDate(order.createdAt)}</span>
              </div>

              <div className="flex gap-2 pt-1 pb-2">
                {!isArchiveMode && (
                  <AppButton
                    onClick={() => onEdit(order)}
                    isLoading={loadingId === order.id}
                    isDisabled={order.status === "RECEIVED" || loadingId === order.id}
                    className="flex-1 bg-[#1D4734] hover:bg-[#153627] text-white text-sm"
                  >
                    تم الاستلام
                  </AppButton>
                )}
                <button
                  onClick={() => setConfirmId(order.id)}
                  disabled={loadingId === order.id}
                  className={cn(
                    "p-2 rounded-lg disabled:opacity-40 border transition-all",
                    isArchiveMode
                      ? "text-red-500 hover:bg-red-50 border-red-200"
                      : "text-amber-600 hover:bg-amber-50 border-amber-200"
                  )}
                >
                  {isArchiveMode ? <Trash2 size={18} /> : <Archive size={18} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
