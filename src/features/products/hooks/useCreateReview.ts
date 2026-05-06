import { useState } from "react";
import { productService } from "../services/product.service";
import { Review } from "../types/product.types";
import { toast } from "sonner";
import { useModalStore } from "@/store/useModalStore";
import { useSession } from "@/features/auth/hooks/useAuth";

export function useCreateReview(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { open } = useModalStore();
  const { data: session, isLoading } = useSession();
  const createReview = async (
    productId: string,
    rating: number,
    comment: string
  ): Promise<Review | null> => {
    setError(null);

    if (isLoading) {
      toast.error("جاري التحقق من تسجيل الدخول...");
      return null;
    }

    const user = session?.data?.user;
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً لتتمكن من إضافة تقييم");
      open("AUTH");
      return null;
    }

    setIsSubmitting(true);

    try {
      const result = await productService.createReview(
        productId,
        rating,
        comment
      );

      if (!result) {
        const msg = "حدث خطأ غير متوقع أثناء إضافة التقييم";
        setError(msg);
        toast.error(msg);
        return null;
      }

      toast.success("تم إضافة تقييمك بنجاح");
      onSuccess?.();

      return result;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "فشل في إضافة التقييم";

      setError(errorMessage);
      toast.error(errorMessage);

      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createReview,
    isSubmitting,
    error,
  };
}