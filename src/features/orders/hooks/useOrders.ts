import { useState, useEffect, useCallback, useRef } from 'react';
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

function playChime() {
  try {
    const ctx = new AudioContext();
    const notes = [880, 1100];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.4, ctx.currentTime + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.4);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.4);
    });
  } catch {}
}

export function useOrders(archived = false) {
  const [data, setData] = useState<PaginatedOrders | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<OrdersFilters>(initialFilters);
  const [loadingId] = useState<string | null>(null);
  const latestOrderIdRef = useRef<string | null>(null);
  const isFetchingRef = useRef(false);
  const hasPushRef = useRef(false);
  const debouncedSearch = useDebounce(filters.searchTerm, 500);

  const fetchOrders = useCallback(async (silent = false) => {
    if (silent && isFetchingRef.current) return; // منع concurrent fetches
    isFetchingRef.current = true;
    if (!silent) setIsLoading(true);
    try {
      const response = await ordersService.fetchAll(
        currentPage,
        ITEMS_PER_PAGE,
        debouncedSearch,
        filters.status,
        filters.orderType,
        filters.bookingType,
        filters.scope,
        filters.sortBy,
        archived
      );

      if (silent && response.orders.length > 0) {
        const newLatestId = response.orders[0].id;
        if (latestOrderIdRef.current && newLatestId !== latestOrderIdRef.current) {
          toast.success('طلب جديد وصل!', { duration: 5000 });
          playChime();
        }
        latestOrderIdRef.current = newLatestId;
      } else if (response.orders.length > 0) {
        latestOrderIdRef.current = response.orders[0].id;
      }

      setData(response);
    } catch {
      if (!silent) toast.error('حدث خطأ في تحميل الطلبات');
    } finally {
      if (!silent) setIsLoading(false);
      isFetchingRef.current = false;
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

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Real-time: service worker pushes message when new order arrives
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "NEW_ORDER") {
        hasPushRef.current = true;
        playChime();
        fetchOrders(true);
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () => navigator.serviceWorker.removeEventListener("message", handleMessage);
  }, [fetchOrders]);

  // Fallback polling كل 60 ثانية — فقط لو الـ push مش شغال
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasPushRef.current) {
        fetchOrders(true);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const archiveOrder = useCallback(async (id: string) => {
    const previous = data;
    setData((prev) =>
      prev ? { ...prev, orders: prev.orders.filter((o) => o.id !== id) } : prev
    );
    try {
      await ordersService.archiveOrder(id);
      toast.success('تم أرشفة الطلب');
    } catch {
      setData(previous);
      toast.error('فشل أرشفة الطلب');
    }
  }, [data]);

  const deleteOrder = useCallback(async (id: string) => {
    const previous = data;
    setData((prev) =>
      prev ? { ...prev, orders: prev.orders.filter((o) => o.id !== id) } : prev
    );
    try {
      await ordersService.deleteOrder(id);
      toast.success('تم حذف الطلب نهائياً');
    } catch {
      setData(previous);
      toast.error('فشل حذف الطلب');
    }
  }, [data]);

  const fetchAllForExport = useCallback(async (): Promise<Order[]> => {
    try {
      const response = await ordersService.fetchAll(
        1,
        1000,
        filters.searchTerm,
        filters.status,
        filters.orderType,
        filters.bookingType,
        filters.scope,
        filters.sortBy
      );
      return response.orders;
    } catch {
      toast.error('حدث خطأ في تصدير الطلبات');
      return [];
    }
  }, [filters]);

  const updateOrderStatus = useCallback(
    async (id: string, status: string) => {
      const previous = data;
      setData((prev) =>
        prev
          ? {
              ...prev,
              orders: prev.orders.map((o) =>
                o.id === id ? { ...o, status: status as Order['status'] } : o
              ),
            }
          : prev
      );
      try {
        await ordersService.updateStatus(id, status);
        toast.success('تم تحديث حالة الطلب');
      } catch {
        setData(previous);
        toast.error('فشل تحديث حالة الطلب');
      }
    },
    [data]
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

  return {
    orders: data?.orders || [],
    isLoading,
    selectedRows,
    currentPage,
    totalPages: data?.totalPages || 1,
    filters,
    selectedOrder: null,
    itemsPerPage: ITEMS_PER_PAGE,
    handleSelectAll,
    handleSelectRow,
    resetFilters,
    updateFilter,
    setCurrentPage,
    refetch: fetchOrders,
    fetchAllForExport,
    updateOrderStatus,
    archiveOrder,
    deleteOrder,
    loadingId,
  };
}
