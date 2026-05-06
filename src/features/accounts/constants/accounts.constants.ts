export const ITEMS_PER_PAGE = 10

export const ROLE_LABELS = {
  ADMIN: 'أدمن',
  USER: 'مستخدم',
} as const

export const STATUS_LABELS = {
  active: 'نشط',
  inactive: 'غير نشط',
} as const

export const ROLE_OPTIONS = [
  { value: 'all', label: 'الكل' },
  { value: 'ADMIN', label: ROLE_LABELS.ADMIN },
  { value: 'USER', label: ROLE_LABELS.USER },
] as const

export const STATUS_OPTIONS = [
  { value: 'all', label: 'الكل' },
  { value: 'active', label: STATUS_LABELS.active },
  { value: 'inactive', label: STATUS_LABELS.inactive },
] as const