"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonTableProps {
  columns: number
  rows?: number
}

export function SkeletonTable({ columns, rows = 10 }: SkeletonTableProps) {
  return (
    <div className="overflow-x-auto w-full border border-card rounded-xl" dir="rtl">
      <Table className="min-w-[1000px] table-fixed">
        <TableHeader className="bg-card">
          <TableRow className="border-none hover:bg-transparent">
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i} className="py-4.75!">
                <Skeleton className="h-5 w-20 mx-auto bg-border/60" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="border-b border-border h-16!">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <div className="flex justify-center items-center">
                    <Skeleton 
                      className={rowIndex % 2 === 0 ? "h-4 w-24 bg-border/40" : "h-4 w-16 bg-border/40"} 
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}