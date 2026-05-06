"use client";

import { Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSession } from "@/features/auth/hooks/useAuth";
import { useModalStore } from "@/store/useModalStore";
import { AppButton } from "@/components/common/AppButton";
import { useCreateReview } from "../hooks/useCreateReview";

interface ReviewModalProps {
  data?: {
    productId: string;
    onSuccess?: () => void;
  };
}

export const ReviewModal = ({ data }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const { close } = useModalStore();
  const { createReview, isSubmitting } = useCreateReview(() => {
    data?.onSuccess?.();
    close();
    setRating(0);
    setComment("");
  });
  
  const productId = data?.productId;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("يرجى اختيار تقييم");
      return;
    }

    if (!comment.trim()) {
      toast.error("يرجى كتابة رأيك");
      return;
    }

    if (!session) {
      toast.error("يرجى تسجيل الدخول أولاً");
      close();
      return;
    }

    if (!productId) {
      toast.error("حدث خطأ في المنتج");
      return;
    }

    await createReview(productId, rating, comment);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col justify-start gap-2 text-right">
        <h3 className="heading-6-bold md:heading-4-bold text-title items-start mt-2 md:mt-0">قيّم تجربتك</h3>
        <p className="text-paragraph text-regular-normal md:text-large-normal">
          شارك رأيك وساعد الآخرين في اختيار الخدمة الأفضل
        </p>
      </div>

      <div>
        <div className="flex justify-center gap-0.5 md:gap-[0.281rem] mb-4 md:mb-0">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
              type="button"
              aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
            >
              <Star
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "w-8 md:w-12 h-8 md:h-12 transition-colors cursor-pointer",
                  (hoverRating > 0 ? i < hoverRating : i < rating) ? "text-rating" : "text-disabled"
                )}
              />
            </button>
          ))}
        </div>
        <div>
          <label className="text-medium-medium text-title mb-2 block">اكتب رأيك</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="مشاركة رأيك يساعدنا على تحسين التجربة"
            className="w-full min-h-24 p-3 md:p-4 text-regular-normal text-paragraph rounded-lg border-[1.5px] border-border outline-none resize-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <AppButton
          onClick={handleSubmit}
          isLoading={isSubmitting}
          className="w-full h-12 md:min-h-14 rounded-xl md:rounded-2xl text-regular-bold md:text-medium-bold text-bg"
        >
          إرسال
        </AppButton>

        <button
          onClick={close}
          className="w-full h-12 md:min-h-14 rounded-xl md:rounded-2xl text-regular-bold md:text-medium-bold bg-disabled text-paragraph hover:bg-disabled/80 transition-colors"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};