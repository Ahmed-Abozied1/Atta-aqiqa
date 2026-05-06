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
import { cn } from "@/lib/utils";
import { User } from "../types/accounts.types";
import { formatUserDate } from "../utils/accounts.utils";

interface AccountsTableProps {
  users: User[];
  selectedRows: string[];
  currentPage: number;
  itemsPerPage: number;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
}

export function AccountsTable({
  users,
  selectedRows,
  currentPage,
  itemsPerPage,
  onSelectAll,
  onSelectRow,
}: AccountsTableProps) {
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
    users.length > 0 && selectedRows.length === users.length;
  const someSelected =
    selectedRows.length > 0 && selectedRows.length < users.length;

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
                الاسم
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                البريد الإلكتروني
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                رقم الهاتف
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                عدد الحجوزات
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                الحالة
              </TableHead>
              <TableHead className="py-4.75 text-title text-center font-bold">
                تاريخ التسجيل
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                className="border-b border-border h-16! text-paragraph! text-medium-normal text-center"
              >
                <TableCell className="pr-6!">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedRows.includes(user.id)}
                      onCheckedChange={handleSelectRow(user.id)}
                      className="bg-bg! data-[state=checked]:bg-secondary! data-[state=checked]:border-secondary! data-[state=checked]:text-bg! w-4! h-4!"
                    />
                    <span className="text-regular-normal text-title">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{user.name}</TableCell>
                <TableCell className="ltr">{user.email}</TableCell>
                <TableCell>{user.phone || "-"}</TableCell>
                <TableCell>{user._count?.orders || 0}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold min-h-10 flex items-center justify-center w-fit mx-auto",
                      user.isActive
                        ? "bg-success/10 text-success"
                        : "bg-error/10 text-error"
                    )}
                  >
                    {user.isActive ? "نشط" : "غير نشط"}
                  </span>
                </TableCell>
                <TableCell>{formatUserDate(user.createdAt)}</TableCell>
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
          <span className="text-title text-regular-bold mr-2">الاسم</span>
        </div>

        {users.map((user, index) => (
          <div key={user.id} className="border-b border-border px-2">
            <div className="flex items-center justify-between py-2 h-14">
              <div className="flex items-center">
                <Checkbox
                  checked={selectedRows.includes(user.id)}
                  onCheckedChange={(c) => onSelectRow(user.id, !!c)}
                />
                <span className="text-title w-8 block text-center">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </span>
                <span className="text-title mr-2">{user.name}</span>
              </div>
            </div>

            <div className="mr-16 pb-2 space-y-2">
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">
                  البريد الإلكتروني
                </span>
                <span className="text-small-normal text-paragraph">
                  {user.email}
                </span>
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">
                  رقم الهاتف
                </span>
                <span className="text-small-normal text-paragraph">
                  {user.phone || "-"}
                </span>
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">
                  الحالة
                </span>
                <span
                  className={cn(
                    "px-2 py-1.25 rounded-full text-small-bold h-8 block",
                    user.isActive
                      ? "bg-success/10 text-success"
                      : "bg-error/10 text-error"
                  )}
                >
                  {user.isActive ? "نشط" : "غير نشط"}
                </span>
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-small-bold text-title">
                  تاريخ التسجيل
                </span>
                <span className="text-small-normal text-paragraph">
                  {formatUserDate(user.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}