"use client";

import { Star, Loader2 } from "lucide-react";
import { ReviewCard } from "./ReviewCard";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useModalStore } from "@/store/useModalStore";
import { AppButton } from "@/components/common/AppButton";
import { useProduct } from "../hooks/useProduct";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  guestName?: string | null;
  guestImage?: string | null;
  user?: {
    name: string;
    image: string | null;
  } | null;
}

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { open } = useModalStore();
  const { refetch: refetchProduct } = useProduct(productId);
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    total: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
      
      const total = data.length;
      const sum = data.reduce((acc: number, r: Review) => acc + r.rating, 0);
      const avg = total > 0 ? sum / total : 0;
      
      const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      data.forEach((r: Review) => {
        dist[r.rating as keyof typeof dist]++;
      });
      
      setRatingStats({
        average: avg,
        total,
        distribution: dist
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error("حدث خطأ في تحميل التقييمات");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = async () => {
    await refetchProduct();
    await fetchReviews();
  };

  const handleOpenReviewModal = () => {
    open("REVIEW", { productId, onSuccess: handleReviewSubmitted });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-4 mt-6 md:mt-10">
        <div className="flex flex-col gap-4 md:gap-6 bg-card rounded-xl md:rounded-2xl p-4 md:p-6">
          <h3 className="heading-6-bold text-title">تقييم العملاء</h3>

          <div className="">
            <span className="heading-3-bold text-title mb-2">{ratingStats.average.toFixed(1)}</span>
            <div className="flex items-center gap-1 mb-2 md:mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "w-5 md:w-6 h-5 md:h-6",
                    i < Math.floor(ratingStats.average) ? "text-rating" : "text-disabled"
                  )}
                />
              ))}
            </div>
            <p className="text-medium-normal md:text-large-normal text-paragraph">بناءً على {ratingStats.total} تقييمات</p>
          </div>

          <div className="">
            {[5, 4, 3, 2, 1].map((stars) => {
              const percentage = ratingStats.total > 0 
                ? (ratingStats.distribution[stars as keyof typeof ratingStats.distribution] / ratingStats.total) * 100 
                : 0;
              return (
                <div key={stars} className="flex items-center gap-2 mb-2">
                  <span className="text-small-medium md:text-medium-medium text-title">{stars} نجوم</span>
                  <div className="flex-1 h-2 md:h-3 bg-disabled/30 rounded-2xl overflow-hidden">
                    <span
                      className="h-full bg-rating rounded-full transition-all duration-500 block"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-small-medium md:text-medium-medium text-title">{Math.round(percentage)}%</span>
                </div>
              );
            })}
          </div>

          <p className="text-small-normal md:text-regular-normal text-paragraph">شاركنا بتعليقاتك وساهم في تحسين تجربة للجميع.</p>

          <AppButton
            onClick={handleOpenReviewModal} 
            className="w-full h-14 md:min-h-14 rounded-xl md:rounded-2xl text-regular-bold md:text-medium-bold text-bg py-3.75"
          >
            اكتب تقييماً
          </AppButton>
        </div>

        <div className="">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <h3 className="heading-6-bold md:heading-5-bold text-title mb-2 md:mb-4">{reviews.length} مراجعة</h3>
              <div className="p-2 md:p-4">
                {reviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-large-normal text-paragraph mb-2">لا توجد تقييمات بعد</p>
                    <p className="text-small-normal text-paragraph">كن أول من يقيم هذا المنتج</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      name={review.guestName || review.user?.name || "مجهول"}
                      image={review.guestImage || review.user?.image || null}
                      comment={review.comment}
                      rating={review.rating}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};