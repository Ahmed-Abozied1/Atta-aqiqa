import { useState, useEffect, useCallback } from "react";
import { Review } from "../types/review.types";

export function useAdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [approvalStatus, setApprovalStatus] = useState<string>("all");
  const [totalReviews, setTotalReviews] = useState(0);

  const itemsPerPage = 10;

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });

      if (searchTerm) {
        params.append("search", searchTerm);
      }

      if (ratingFilter !== "all") {
        params.append("rating", ratingFilter);
      }

      if (approvalStatus !== "all") {
        params.append("approvalStatus", approvalStatus);
      }

      const response = await fetch(`/api/admin/reviews?${params}`);
      const data = await response.json();

      setReviews(data.reviews || []);
      setTotalPages(data.totalPages || 1);
      setTotalReviews(data.total || 0);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, ratingFilter, approvalStatus]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: true }),
      });

      if (response.ok) {
        await fetchReviews();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error approving review:", error);
      return false;
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: false }),
      });

      if (response.ok) {
        await fetchReviews();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error rejecting review:", error);
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchReviews();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting review:", error);
      return false;
    }
  };

  const refetch = useCallback(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
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
    refetch,
    itemsPerPage,
  };
}