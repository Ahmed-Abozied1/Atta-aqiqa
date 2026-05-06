import { useState, useEffect, useCallback } from 'react';
import { Order, OrdersFilters, PaginatedOrders } from '../types/orders.types';
import { ordersService } from '../services/orders.service';
import { toast } from 'sonner';
import { ITEMS_PER_PAGE } from '../constants';

const initialFilters: OrdersFilters = {
  searchTerm: '',
  status: 'all',
  orderType: 'all',
  bookingType: 'all',
  scope: 'all',
  sortBy: 'newest',
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function useOrders() {
  const [data, setData] = useState<PaginatedOrders | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<OrdersFilters>(initialFilters);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(filters.searchTerm, 500);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ordersService.fetchAll(
        currentPage,
        ITEMS_PER_PAGE,
        debouncedSearch,
        filters.status,
        filters.orderType,
        filters.bookingType,
        filters.scope,
        filters.sortBy
      );
      setData(response);
      
      const allResponse = await ordersService.fetchAll(
        1,
        1000,
        debouncedSearch,
        filters.status,
        filters.orderType,
        filters.bookingType,
        filters.scope,
        filters.sortBy
      );
      setAllOrders(allResponse.orders);
    } catch {
      toast.error('حدث خطأ في تحميل الطلبات');
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    debouncedSearch,
    filters.status,
    filters.orderType,
    filters.bookingType,
    filters.scope,
    filters.sortBy,
  ]);

  const updateOrderStatus = useCallback(
    async (id: string, status: string) => {
      setLoadingId(id);
      try {
        await ordersService.updateStatus(id, status);
        toast.success('تم تحديث حالة الطلب');
        fetchOrders();
      } catch {
        toast.error('فشل تحديث حالة الطلب');
      } finally {
        setLoadingId(null);
      }
    },
    [fetchOrders]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked && data?.orders) {
        setSelectedRows(data.orders.map((order) => order.id));
      } else {
        setSelectedRows([]);
      }
    },
    [data?.orders]
  );

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setCurrentPage(1);
    toast.success('تم إعادة تعيين الفلاتر');
  }, []);

  const updateFilter = useCallback(<K extends keyof OrdersFilters>(key: K, value: OrdersFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders: data?.orders || [],
    allOrders,
    isLoading,
    selectedRows,
    currentPage,
    totalPages: data?.totalPages || 1,
    filters,
    selectedOrder,
    itemsPerPage: ITEMS_PER_PAGE,
    handleSelectAll,
    handleSelectRow,
    resetFilters,
    updateFilter,
    setCurrentPage,
    refetch: fetchOrders,
    updateOrderStatus,
    loadingId,
  };
}