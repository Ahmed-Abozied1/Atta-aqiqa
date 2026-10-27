export const ITEMS_PER_PAGE = 10

export const ROLE_LABELS = {
  ADMIN: 'أدمن',
  STAFF: 'موظف طلبات',
  USER: 'عميل',
} as const

export const STATUS_LABELS = {
  active: 'نشط',
  inactive: 'غير نشط',
} as const

export const ACCOUNTS_TABS = [
  { value: 'customers', label: 'العملاء' },
  { value: 'team', label: 'فريق العمل' },
] as const
