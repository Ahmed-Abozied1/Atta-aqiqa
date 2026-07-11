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
import { Trash2 } from "lucide-react";
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
}

export function OrdersTable({
  orders,
  currentPage,
  itemsPerPage,
  onEdit,
  onDelete,
  loadingId,
}: OrdersTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div className="w-full" dir="rtl">
      <div className="overflow-x-auto w-full">
        <Table className="min-w-max hidden md:table">
          <TableHeader className="bg-card">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="pr-6! py-4.75! text-right">
                <span className="text-secondary heading-6-bold">#</span>
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                اسم العميل
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                رقم الهاتف
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                مكان التنفيذ
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                نوع الذبيحة
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                العدد
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                نوع الحجز
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                الحالة
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                التاريخ
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                الإجراءات
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold w-16">
                حذف
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.id}
                className="border-b border-border h-16! text-paragraph! text-medium-normal text-center"
              >
                <TableCell className="pr-6!">
                  <span className="text-regular-normal text-title">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </span>
                </TableCell>

                <TableCell>{order.beneficiaryName || "زائر"}</TableCell>
                <TableCell className="ltr" dir="ltr">{order.phone}</TableCell>
                <TableCell>
                  {order.product?.location === "INSIDE_EGYPT"
                    ? "داخل مصر"
                    : "أفريقيا"}
                </TableCell>
                <TableCell>{order.product?.name}</TableCell>
                <TableCell>{order.quantity ?? 1}</TableCell>
                <TableCell>{getIntentLabel(order.intent)}</TableCell>
                <TableCell>
                  <span
                    className={
                      STATUS_COLORS[order.status] +
                      " px-4 py-2 rounded-full text-xs font-bold min-h-10 flex items-center justify-center w-fit mx-auto"
                    }
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </TableCell>
                <TableCell>{formatOrderDate(order.createdAt)}</TableCell>
                <TableCell>
                  <AppButton
                    onClick={() => onEdit(order)}
                    isLoading={loadingId === order.id}
                    className="bg-[#1D4734] hover:bg-[#153627] text-white"
                    isDisabled={
                      order.status === "RECEIVED" ||
                      loadingId === order.id
                    }
                  >
                    تم الاستلام
                  </AppButton>
                </TableCell>
                <TableCell className="w-16 text-center">
                  <button
                    onClick={() => setConfirmId(order.id)}
                    disabled={loadingId === order.id}
                    className="p-2 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-40 transition-all cursor-pointer mx-auto flex items-center justify-center"
                  >
                    <Trash2 size={22} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
        <DialogContent dir="rtl" className="max-w-sm rounded-2xl p-0 overflow-hidden bg-white">
          <div className="flex flex-col items-center gap-4 px-6 pt-8 pb-2 text-center">
            <div className="bg-red-100 p-4 rounded-full">
              <Trash2 size={28} className="text-red-500" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-title">تأكيد الحذف</DialogTitle>
            </DialogHeader>
            <p className="text-paragraph text-sm leading-relaxed">
              هل أنت متأكد من حذف هذا الطلب نهائياً؟<br />
              <span className="text-red-500 font-medium">لا يمكن التراجع عن هذا الإجراء.</span>
            </p>
          </div>
          <DialogFooter className="flex flex-row-reverse gap-2 px-6 py-4 border-t border-border mt-2">
            <Button
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              onClick={() => { onDelete(confirmId!); setConfirmId(null); }}
            >
              نعم، احذف
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl cursor-pointer"
              onClick={() => setConfirmId(null)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="md:hidden mt-4">
        <div className="flex items-center bg-card py-4 px-2 rounded-xl">
          <span className="text-secondary heading-6-bold block w-8 text-center">#</span>
          <span className="text-title text-regular-bold mr-2">اسم العميل</span>
        </div>

        {orders.map((order, index) => (
          <div key={order.id} className="border-b border-border px-2">
            <div className="flex items-center py-2 h-14">
              <span className="text-title w-8 block text-center">
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </span>
              <span className="text-title mr-2">
                {order.beneficiaryName || "زائر"}
              </span>
            </div>

            <div className="mr-8 pb-2 space-y-2">
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title" dir="ltr">
                  رقم الهاتف
                </span>
                <span className="text-small-normal text-paragraph ltr" dir="ltr">
                  {order.phone}
                </span>
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
                <span
                  className={cn(
                    "px-2 py-1.25 rounded-full text-small-bold h-8 block",
                    STATUS_COLORS[order.status]
                  )}
                >
                  {STATUS_LABELS[order.status]}
                </span>
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">التاريخ</span>
                <span className="text-small-normal text-paragraph">
                  {formatOrderDate(order.createdAt)}
                </span>
              </div>

              <div className="flex gap-2 pt-1 pb-2">
                <AppButton
                  onClick={() => onEdit(order)}
                  isLoading={loadingId === order.id}
                  isDisabled={order.status === "RECEIVED" || loadingId === order.id}
                  className="flex-1 bg-[#1D4734] hover:bg-[#153627] text-white text-sm"
                >
                  تم الاستلام
                </AppButton>
                <button
                  onClick={() => setConfirmId(order.id)}
                  disabled={loadingId === order.id}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-40 border border-red-200 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
