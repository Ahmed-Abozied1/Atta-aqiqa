export type UserRole = 'ADMIN' | 'USER';

export interface User {
  emailVerified: boolean;
  id: string;
  name: string;
  email: string;
  isActive: boolean; 
  image: string | null;
  phone: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  _count?: {
    orders: number;
  };
}

export interface AccountsFilters {
  searchTerm: string;
  role: string;
  status: string;
  sortBy: string;
}

export interface AccountsState {
  users: User[];
  allUsers: User[];
  isLoading: boolean;
  selectedRows: string[];
  currentPage: number;
  totalPages: number;
}

export interface AccountsHookReturn extends AccountsState {
  filters: AccountsFilters;
  itemsPerPage: number;
  handleSelectAll: (checked: boolean) => void;
  handleSelectRow: (id: string, checked: boolean) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof AccountsFilters>(key: K, value: AccountsFilters[K]) => void;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

export interface ExportUserData {
  'الاسم': string;
  'البريد الإلكتروني': string;
  'رقم الهاتف': string;
  'الحالة': string;
  'الدور': string;
  'تاريخ التسجيل': string;
}

export interface PaginatedUsers {
  users: User[]
  total: number
  totalPages: number
  page: number
}