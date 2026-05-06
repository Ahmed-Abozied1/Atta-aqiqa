import { useState, useEffect, useCallback } from "react";
import { Product } from "../types/admin-products.types";

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const itemsPerPage = 10;

  const fetchProducts = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
      });

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      const productsWithIntents = (data.data || []).map((product: any) => ({
        ...product,
        intents: product.intents || []
      }));

      setProducts(productsWithIntents);
      const total = data.pagination?.total ?? 0;
      setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));
    } catch {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  const handleSelectAll = useCallback((checked: boolean) => {
    setSelectedRows(checked ? products.map((p) => p.id) : []);
  }, [products]);

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    setSelectedRows((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  }, []);

  const refetch = useCallback(() => fetchProducts(currentPage), [fetchProducts, currentPage]);

  return {
    products,
    isLoading,
    selectedRows,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    handleSelectAll,
    handleSelectRow,
    refetch,
  };
}