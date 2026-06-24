export type OrderStatus = 'PENDING' | 'RECEIVED' | 'EXECUTING' | 'COMPLETED';

export type OrderIntent =
  | 'SADAKA'
  | 'AQEEQA'
  | 'NAZR'
  | 'ADHIYA'
  | 'KAFFARA';
export interface OrderUser {
  name: string;
  email: string;
  phone: string | null;
}

export interface OrderProduct {
  name: string;
  imageUrl: string | null;
  location?: 'INSIDE_EGYPT' | 'OUTSIDE_EGYPT';
}

export interface Order {
  id: string;
  orderNumber: number;
  userId: string;
  productId: string;
  status: OrderStatus;
  totalPrice: number;
  intent: OrderIntent;
  shares: number;
  beneficiaryName: string;
  phone: string;
  address: string | null;
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  product: OrderProduct;
  user: OrderUser;
}

export interface OrdersFilters {
  searchTerm: string;
  status: string;
  orderType: string;
  bookingType: string;
  scope: string;
  sortBy: string;
}

export interface OrderUpdatePayload {
  status?: OrderStatus;
  videoUrl?: string | null;
}

export interface OrdersState {
  orders: Order[];
  filteredOrders: Order[];
  isLoading: boolean;
  selectedRows: string[];
  currentPage: number;
  expandedRow: string | null;
}

export interface OrdersActions {
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, payload: OrderUpdatePayload) => Promise<boolean>;
  selectAll: (checked: boolean) => void;
  selectRow: (id: string, checked: boolean) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  setExpandedRow: (id: string | null) => void;
  updateFilter: <K extends keyof OrdersFilters>(key: K, value: OrdersFilters[K]) => void;
}

export interface OrdersHookReturn extends OrdersState, OrdersActions {
  totalPages: number;
  paginatedOrders: Order[];
  filters: OrdersFilters;
}

export interface ExportDataRow {
  'رقم الطلب': number;
  'العميل': string;
  'رقم الهاتف': string;
  'المنتج': string;
  'النية': string;
  'السعر': number;
  'الحالة': string;
  'تاريخ الطلب': string;
}

export interface PaginatedOrders {
  orders: Order[];
  total: number;
  totalPages: number;
  page: number;
}