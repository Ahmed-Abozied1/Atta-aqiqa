"use client";

import { useState } from "react";
import { AppButton } from "@/components/common/AppButton";
import { useModalStore } from "@/store/useModalStore";
import { toast } from "sonner";

interface DeleteProductModalProps {
  data: {
    productId: string;
    productName: string;
  };
}

export const DeleteProductModal = ({ data }: DeleteProductModalProps) => {
  const { productId, productName } = data;
  const { close } = useModalStore();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("تم حذف المنتج بنجاح");
      close();
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("فشل في حذف المنتج");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-center p-2">
      <div className="space-y-2">
        <p className="text-paragraph text-sm">
          هل أنت متأكد من حذف هذا المنتج؟
        </p>
      </div>

      <p className="font-bold text-title py-2 break-words text-center">
        {productName || "هذا المنتج"}
      </p>

      <div className="flex justify-center gap-3 pt-2">
        <AppButton
          type="button"
          appVariant="secondary"
          onClick={close}
          className="h-10 px-6 text-sm"
        >
          إلغاء
        </AppButton>

        <AppButton
          type="button"
          appVariant="primary"
          onClick={handleDelete}
          isLoading={loading}
          className="h-10 px-6 text-sm bg-red-500 hover:bg-red-600!"
        >
          حذف
        </AppButton>
      </div>
    </div>
  );
};