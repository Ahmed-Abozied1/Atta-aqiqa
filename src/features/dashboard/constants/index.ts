import { OrderIntent, OrderStatus } from "@/features/orders/types/orders.types";

export const ITEMS_PER_PAGE = 10;

export const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-warning/10 text-warning',
  RECEIVED: 'bg-info/10 text-info',
  EXECUTING: 'bg-primary/10 text-primary',
  COMPLETED: 'bg-success/10 text-success',
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'قيد الاستلام',
  RECEIVED: 'تم الاستلام',
  EXECUTING: 'قيد التنفيذ',
  COMPLETED: 'تم التنفيذ',
};

export const INTENT_LABELS: Record<OrderIntent, string> = {
  SADAKA: 'صدقة',
  AQEEQA: 'عقيقة',
  NAZR: 'نذر',
  ADHIYA: 'أضحية',
  KAFFARA: 'كفارة يمين',
};

export const STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'الكل' },
  { value: 'PENDING', label: STATUS_LABELS.PENDING },
  { value: 'RECEIVED', label: STATUS_LABELS.RECEIVED },
  { value: 'EXECUTING', label: STATUS_LABELS.EXECUTING },
  { value: 'COMPLETED', label: STATUS_LABELS.COMPLETED },
];

export const EDIT_STATUS_OPTIONS: Array<{ value: OrderStatus; label: string }> = [
  { value: 'PENDING', label: STATUS_LABELS.PENDING },
  { value: 'RECEIVED', label: STATUS_LABELS.RECEIVED },
  { value: 'EXECUTING', label: STATUS_LABELS.EXECUTING },
  { value: 'COMPLETED', label: STATUS_LABELS.COMPLETED },
];