"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "../types/admin-products.types";
import { useModalStore } from "@/store/useModalStore";

interface Props {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
  onEdit: (product: Product) => void;
  onDeleteSuccess: () => void;
}

export function AdminProductsTable({
  products,
  currentPage,
  itemsPerPage,
  onEdit,
  onDeleteSuccess,
}: Props) {
  const { open } = useModalStore();

  const handleDelete = (product: Product) => {
    open("ADMIN_PRODUCT_DELETE", {
      productId: product.id,
      productName: product.name,
      onSuccess: onDeleteSuccess,
    });
  };

  if (products.length === 0) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        لا توجد منتجات
      </p>
    );
  }

  return (
    <div className="w-full" dir="rtl">
      <div className="overflow-x-auto w-full">
        <Table className="hidden md:table min-w-max">
          <TableHeader className="bg-card">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-center">#</TableHead>
              <TableHead className="text-center">الاسم</TableHead>
              <TableHead className="text-center">السعر</TableHead>
              <TableHead className="text-center">الموقع</TableHead>
              <TableHead className="text-center">المستفيدين</TableHead>
              <TableHead className="text-center">النية</TableHead>

              <TableHead className="text-center">التقييم</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={product.id}
                className="border-b border-border text-center"
              >
                <TableCell>
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </TableCell>

                <TableCell className="font-medium">{product.name}</TableCell>

                <TableCell>{product.price} EGP</TableCell>

                <TableCell>
                  {product.location === "INSIDE_EGYPT"
                    ? "داخل مصر"
                    : "خارج مصر"}
                </TableCell>

                <TableCell>{product.beneficiaries}</TableCell>
<TableCell>
  <div className="flex flex-wrap gap-1 justify-center">
    {product.intents?.map((intent) => (
      <span key={intent} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
        {intent === "ADHIYA" ? "أضحية" :
         intent === "BUY" ? "شراء" :
         intent === "AQEEQA" ? "عقيقة" :
         intent === "NAZR" ? "نذر" :
         intent === "KAFFARA" ? "كفارة" :
         intent === "SADAKA" ? "صدقة" : intent}
      </span>
    ))}
  </div>
</TableCell>
                <TableCell>
                  {product.rating?.toFixed(1) || "0.0"}
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-primary hover:bg-primary/10 transition-colors"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="size-4 text-primary" />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      className="border-red-500 hover:bg-red-500/10 hover:border-red-600 transition-colors"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="md:hidden mt-4 space-y-3">
          {products.map((product, index) => (
            <div key={product.id} className="border-b border-border px-2 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </span>
                <span className="font-semibold">{product.name}</span>
              </div>

              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div>السعر: {product.price} EGP</div>
                <div>
                  الموقع:{" "}
                  {product.location === "INSIDE_EGYPT"
                    ? "داخل مصر"
                    : "خارج مصر"}
                </div>
                <div>المستفيدين: {product.beneficiaries}</div>
                <div>التقييم: {product.rating?.toFixed(1) || "0.0"}</div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="flex-1 bg-primary text-white!"
                  onClick={() => onEdit(product)}
                >
                  تعديل
                </Button>

                <Button
                  size="sm"
                  className="flex-1 bg-red-800 text-white!"
                  onClick={() => handleDelete(product)}
                >
                  حذف
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}