"use client";

import { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Order } from "../types/orders.types";
import { formatOrderDate, getIntentLabel } from "../utils/orders.utils";
import { STATUS_COLORS, STATUS_LABELS } from "../constants";
import { AppButton } from "@/components/common/AppButton";
import { cn } from "@/lib/utils";

interface OrdersTableProps {
  orders: Order[];
  selectedRows: string[];
  currentPage: number;
  itemsPerPage: number;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onEdit: (order: Order) => void;
  loadingId?: string | null;
}

export function OrdersTable({
  orders,
  selectedRows,
  currentPage,
  itemsPerPage,
  onSelectAll,
  onSelectRow,
  onEdit,
  loadingId,
}: OrdersTableProps) {
  const handleSelectAll = useCallback(
    (checked: boolean | string) => {
      onSelectAll(checked === true);
    },
    [onSelectAll]
  );

  const handleSelectRow = useCallback(
    (id: string) => (checked: boolean | string) => {
      onSelectRow(id, checked === true);
    },
    [onSelectRow]
  );

  const allSelected =
    orders.length > 0 && selectedRows.length === orders.length;
  const someSelected =
    selectedRows.length > 0 && selectedRows.length < orders.length;

  return (
    <div className="w-full" dir="rtl">
      <div className="overflow-x-auto w-full">
        <Table className="min-w-max hidden md:table">
          <TableHeader className="bg-card">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="flex items-center gap-3 pr-6! py-4.75! text-right">
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? "indeterminate" : false
                  }
                  onCheckedChange={handleSelectAll}
                  className="bg-bg! data-[state=checked]:bg-secondary! data-[state=checked]:border-secondary! data-[state=checked]:text-bg! w-4 h-4!"
                />
                <span className="text-secondary heading-6-bold">#</span>
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                اسم المستخدم
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                البريد الإلكتروني
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                رقم الهاتف
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                العنوان
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                النطاق
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                المنتج
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
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.id}
                className="border-b border-border h-16! text-paragraph! text-medium-normal text-center"
              >
                <TableCell className="pr-6!">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedRows.includes(order.id)}
                      onCheckedChange={handleSelectRow(order.id)}
                      className="bg-bg! data-[state=checked]:bg-secondary! data-[state=checked]:border-secondary! data-[state=checked]:text-bg! w-4! h-4!"
                    />
                    <span className="text-regular-normal text-title">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{order.beneficiaryName || "زائر"}</TableCell>
                <TableCell className="ltr">{order.user?.email || "غير مسجل"}</TableCell>
                <TableCell className="ltr"dir="ltr">{order.phone}</TableCell>
                <TableCell>{order.address || "العنوان"}</TableCell>
                <TableCell>
                  {order.product?.location === "INSIDE_EGYPT"
                    ? "داخل مصر"
                    : "خارج مصر"}
                </TableCell>
                <TableCell>{order.product?.name}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden mt-4">
        <div className="flex items-center bg-card py-4 px-2 rounded-xl">
          <div className="flex items-center">
            <Checkbox />
            <span className="text-secondary heading-6-bold block w-8 text-center">
              #
            </span>
          </div>
          <span className="text-title text-regular-bold mr-2">
            اسم المستخدم
          </span>
        </div>

        {orders.map((order, index) => (
          <div key={order.id} className="border-b border-border px-2">
            <div className="flex items-center justify-between py-2 h-14">
              <div className="flex items-center">
                <Checkbox
                  checked={selectedRows.includes(order.id)}
                  onCheckedChange={(c) => onSelectRow(order.id, !!c)}
                />
                <span className="text-title w-8 block text-center">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </span>
                <span className="text-title mr-2">
                  {order.beneficiaryName || "زائر"}
                </span>
              </div>
            </div>

            <div className="mr-16 pb-2 space-y-2">
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">
                  البريد الإلكتروني
                </span>
                <span className="text-small-normal text-paragraph">
                  {order.user?.email || "غير مسجل"}
                </span>
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title" dir="ltr">
                  رقم الهاتف
                </span>
                <span className="text-small-normal text-paragraph ltr" dir="ltr" >
                  {order.phone}
                </span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}