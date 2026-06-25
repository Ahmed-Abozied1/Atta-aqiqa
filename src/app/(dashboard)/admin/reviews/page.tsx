"use client";

import { useState, useEffect } from "react";
import { useAdminReviews } from "@/features/admin-reviews/hooks/useAdminReviews";
import { SkeletonTable } from "@/components/common/SkeletonTable";
import { AppButton } from "@/components/common/AppButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, ChevronRight, ChevronLeft, CheckCircle, XCircle, Plus, Star as StarIcon, Upload, X } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function AdminReviewsPage() {
  const {
    reviews,
    isLoading,
    currentPage,
    totalPages,
    totalReviews,
    searchTerm,
    ratingFilter,
    approvalStatus,
    setCurrentPage,
    setSearchTerm,
    setRatingFilter,
    setApprovalStatus,
    handleApprove,
    handleReject,
    handleDelete,
  } = useAdminReviews();

  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [form, setForm] = useState({ guestName: "", guestImage: "", productId: "", rating: 5, comment: "" });

  useEffect(() => {
    fetch("/api/products?limit=100")
      .then((r) => r.json())
      .then((d) => setProducts(d.data || []));
  }, []);

  const handleAddReview = async () => {
    if (!form.guestName.trim() || !form.productId) {
      toast.error("الاسم والمنتج مطلوبان");
      return;
    }
    setAddLoading(true);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("تم إضافة التقييم");
      setShowAddModal(false);
      setForm({ guestName: "", guestImage: "", productId: "", rating: 5, comment: "" });
      window.location.reload();
    } catch {
      toast.error("فشل في إضافة التقييم");
    } finally {
      setAddLoading(false);
    }
  };

  const onApprove = async (id: string) => {
    setApprovingId(id);
    const success = await handleApprove(id);
    if (success) {
      toast.success("تم الموافقة على التقييم");
    } else {
      toast.error("فشل في الموافقة على التقييم");
    }
    setApprovingId(null);
  };

  const onReject = async (id: string) => {
    setRejectingId(id);
    const success = await handleReject(id);
    if (success) {
      toast.success("تم رفض التقييم");
    } else {
      toast.error("فشل في رفض التقييم");
    }
    setRejectingId(null);
  };

  const onDelete = async (id: string) => {
    setDeletingId(id);
    const success = await handleDelete(id);
    if (success) {
      toast.success("تم حذف التقييم");
    } else {
      toast.error("فشل في حذف التقييم");
    }
    setDeletingId(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMMM yyyy", { locale: ar });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5 justify-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-rating fill-rating" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (isApproved: boolean) => {
    if (isApproved) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3" />
          مقبول
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
        <XCircle className="w-3 h-3" />
        قيد المراجعة
      </span>
    );
  };

  if (isLoading && reviews.length === 0) {
    return (
      <div className="bg-card min-h-screen" dir="rtl">
        <h2 className="heading-5-bold md:heading-4-bold text-title mb-6 md:mb-8">
          إدارة التقييمات
        </h2>
        <div className="bg-bg rounded-2xl border border-card p-4 md:p-6">
          <SkeletonTable columns={7} rows={10} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card min-h-screen" dir="rtl">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="heading-5-bold md:heading-4-bold text-title">إدارة التقييمات</h2>
        <AppButton onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة تقييم
        </AppButton>
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent dir="rtl" className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>إضافة تقييم من فيسبوك</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium text-title block mb-1">اسم العميل</label>
              <Input
                placeholder="اسم العميل على فيسبوك"
                value={form.guestName}
                onChange={(e) => setForm((f) => ({ ...f, guestName: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-title block mb-2">صورة العميل</label>
              {form.guestImage ? (
                <div className="relative w-16 h-16">
                  <Image src={form.guestImage} alt="صورة العميل" fill className="rounded-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, guestImage: "" }))}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <UploadButton<OurFileRouter, "reviewImage">
                  endpoint="reviewImage"
                  onClientUploadComplete={(res) => {
                    if (res?.[0]?.url) setForm((f) => ({ ...f, guestImage: res[0].url }));
                  }}
                  onUploadError={() => toast.error("فشل رفع الصورة")}
                  appearance={{
                    button: "bg-primary text-white text-sm px-4 py-2 rounded-lg",
                    allowedContent: "hidden",
                  }}
                  content={{ button: <><Upload className="w-4 h-4 ml-1 inline" />رفع صورة</> }}
                />
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-title block mb-1">المنتج</label>
              <select
                value={form.productId}
                onChange={(e) => setForm((f) => ({ ...f, productId: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg text-paragraph"
              >
                <option value="">اختر المنتج</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-title block mb-2">التقييم</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setForm((f) => ({ ...f, rating: star }))}>
                    <StarIcon className={`w-8 h-8 ${star <= form.rating ? "fill-rating text-rating" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-title block mb-1">التعليق</label>
              <Textarea
                placeholder="اكتب التعليق هنا..."
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                rows={3}
              />
            </div>
            <AppButton onClick={handleAddReview} isLoading={addLoading} className="w-full">
              إضافة التقييم
            </AppButton>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-bg rounded-2xl border border-card p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="بحث عن تقييم..."
              value={searchTerm}
              onChange={handleSearch}
              className="pr-10"
              aria-label="بحث عن تقييم"
            />
          </div>

          <div className="flex gap-2">
            <label className="sr-only" htmlFor="rating-filter">تصفية حسب التقييم</label>
            <select
              id="rating-filter"
              value={ratingFilter}
              onChange={(e) => {
                setRatingFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-border rounded-lg bg-bg text-paragraph"
              aria-label="تصفية حسب التقييم"
              title="تصفية حسب التقييم"
            >
              <option value="all">كل التقييمات</option>
              <option value="5">5 نجوم</option>
              <option value="4">4 نجوم</option>
              <option value="3">3 نجوم</option>
              <option value="2">2 نجوم</option>
              <option value="1">1 نجوم</option>
            </select>

            <label className="sr-only" htmlFor="approval-status">تصفية حسب حالة الموافقة</label>
            <select
              id="approval-status"
              value={approvalStatus}
              onChange={(e) => {
                setApprovalStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-border rounded-lg bg-bg text-paragraph"
              aria-label="تصفية حسب حالة الموافقة"
              title="تصفية حسب حالة الموافقة"
            >
              <option value="all">الكل</option>
              <option value="pending">قيد المراجعة</option>
              <option value="approved">مقبول</option>
            </select>
          </div>
        </div>

        <div className="mb-6 p-4 bg-card rounded-lg">
          <p className="text-paragraph">
            إجمالي التقييمات: <span className="text-title font-bold">{totalReviews}</span>
          </p>
        </div>

        <div className="overflow-x-auto w-full">
          <Table className="min-w-max hidden md:table">
            <TableHeader className="bg-card">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">المستخدم</TableHead>
                <TableHead className="text-center">المنتج</TableHead>
                <TableHead className="text-center">التقييم</TableHead>
                <TableHead className="text-center">التعليق</TableHead>
                <TableHead className="text-center">الحالة</TableHead>
                <TableHead className="text-center">التاريخ</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reviews.map((review, index) => (
                <TableRow
                  key={review.id}
                  className="border-b border-border text-center"
                >
                  <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
                  <TableCell className="font-medium">
                    {review.guestName || review.user?.name || "مستخدم محذوف"}
                  </TableCell>
                  <TableCell>{review.product?.name}</TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {review.comment}
                  </TableCell>
                  <TableCell>{getStatusBadge(review.isApproved)}</TableCell>
                  <TableCell>{formatDate(review.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {!review.isApproved && (
                        <AppButton
                          size="sm"
                          onClick={() => onApprove(review.id)}
                          isLoading={approvingId === review.id}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs"
                          aria-label={`موافقة على تقييم ${review.user?.name}`}
                          disabled={approvingId === review.id || rejectingId === review.id || deletingId === review.id}
                        >
                          موافقة
                        </AppButton>
                      )}
                      {review.isApproved && (
                        <AppButton
                          size="sm"
                          onClick={() => onReject(review.id)}
                          isLoading={rejectingId === review.id}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 text-xs"
                          aria-label={`رفض تقييم ${review.user?.name}`}
                          disabled={approvingId === review.id || rejectingId === review.id || deletingId === review.id}
                        >
                          رفض
                        </AppButton>
                      )}
                      <AppButton
                        size="sm"
                        onClick={() => onDelete(review.id)}
                        isLoading={deletingId === review.id}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs"
                        aria-label={`حذف تقييم ${review.user?.name}`}
                        disabled={approvingId === review.id || rejectingId === review.id || deletingId === review.id}
                      >
                        حذف
                      </AppButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="md:hidden mt-4 space-y-3">
            {reviews.map((review, index) => (
              <div key={review.id} className="border-b border-border px-2 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {index + 1 + (currentPage - 1) * 10}
                    </span>
                    <span className="font-semibold">
                      {review.guestName || review.user?.name || "مستخدم محذوف"}
                    </span>
                  </div>
                  {getStatusBadge(review.isApproved)}
                </div>

                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <div>المنتج: {review.product?.name}</div>
                  <div className="flex items-center gap-1">
                    التقييم: {renderStars(review.rating)}
                  </div>
                  <div>التعليق: {review.comment}</div>
                  <div>التاريخ: {formatDate(review.createdAt)}</div>
                </div>

                <div className="flex gap-2 mt-3">
                  {!review.isApproved && (
                    <AppButton
                      size="sm"
                      onClick={() => onApprove(review.id)}
                      isLoading={approvingId === review.id}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      aria-label={`موافقة على تقييم ${review.user?.name}`}
                      disabled={approvingId === review.id || rejectingId === review.id || deletingId === review.id}
                    >
                      موافقة
                    </AppButton>
                  )}
                  {review.isApproved && (
                    <AppButton
                      size="sm"
                      onClick={() => onReject(review.id)}
                      isLoading={rejectingId === review.id}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                      aria-label={`رفض تقييم ${review.user?.name}`}
                      disabled={approvingId === review.id || rejectingId === review.id || deletingId === review.id}
                    >
                      رفض
                    </AppButton>
                  )}
                  <AppButton
                    size="sm"
                    onClick={() => onDelete(review.id)}
                    isLoading={deletingId === review.id}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    aria-label={`حذف تقييم ${review.user?.name}`}
                    disabled={approvingId === review.id || rejectingId === review.id || deletingId === review.id}
                  >
                    حذف
                  </AppButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-card p-2 md:px-6 md:py-4 mt-4 md:mt-6 rounded-lg">
            <span className="text-paragraph text-small-normal md:text-regular-normal">
              صفحة {currentPage} من {totalPages}
            </span>

            <div className="flex gap-4">
              <AppButton
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg bg-disabled text-paragraph text-small-bold h-8! md:h-10! px-2! md:px-4! disabled:opacity-50"
                aria-label="الصفحة السابقة"
              >
                <span className="hidden md:block">السابق</span>
                <ChevronRight className="block md:hidden size-4" />
              </AppButton>

              <AppButton
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg bg-primary text-small-bold h-8! md:h-10! px-2! md:px-4! text-bg disabled:opacity-50"
                aria-label="الصفحة التالية"
              >
                <span className="hidden md:block">التالي</span>
                <ChevronLeft className="block md:hidden size-4" />
              </AppButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}