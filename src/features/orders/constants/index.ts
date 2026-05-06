export const ITEMS_PER_PAGE = 10;

export const STATUS_LABELS: Record<string, string> = {
  PENDING: 'قيد الاستلام',
  RECEIVED: 'تم الاستلام',
};

export const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-[#ECEDEE] text-loading',
  RECEIVED: 'bg-success/10 text-paragraph',
};

export const INTENT_LABELS: Record<string, string> = {
  SADAKA: 'صدقة',
  AQEEQA: 'عقيقة',
  NAZR: 'ندر',
  ADHIYA: 'أضحية',
  KAFFARA: 'كفارة بمين',
  SLAUGHTERED: 'مذبوح',
  ALIVE: 'صاحي',
  VOW: 'نذر',
};

export const ORDER_TYPE_LABELS: Record<string, string> = {
  BOOKING: 'حجز',
  PURCHASE: 'شراء',
};

export const SCOPE_LABELS: Record<string, string> = {
  INSIDE_EGYPT: 'داخل مصر',
  OUTSIDE_EGYPT: 'خارج مصر',
};

export const SORT_LABELS: Record<string, string> = {
  newest: 'الأحدث',
  oldest: 'الأقدم',
  name: 'الاسم',
};

export const FILTER_OPTIONS = {
  status: [
    { value: 'all', label: 'الكل' },
    { value: 'PENDING', label: 'قيد الاستلام' },
    { value: 'RECEIVED', label: 'تم الاستلام' },
  ],
  orderType: [
    { value: 'all', label: 'الكل' },
    { value: 'BOOKING', label: 'حجز' },
    { value: 'PURCHASE', label: 'شراء' },
  ],
 bookingType: [
    { value: 'all', label: 'الكل' },
    { value: 'SADAKA', label: 'صدقة' },
    { value: 'AQEEQA', label: 'عقيقة' },
    { value: 'NAZR', label: 'ندر' },
    { value: 'KAFFARA', label: 'كفارة يمين' },
    { value: 'ADHIYA', label: 'أضحية' },
    { value: 'VOW', label: 'نذر' },
    { value: 'SLAUGHTERED', label: 'مذبوح' },
    { value: 'ALIVE', label: 'صاحي' },
  ],
  scope: [
    { value: 'all', label: 'الكل' },
    { value: 'INSIDE_EGYPT', label: 'داخل مصر' },
    { value: 'OUTSIDE_EGYPT', label: 'خارج مصر' },
  ],
  sortBy: [
    { value: 'newest', label: 'الأحدث' },
    { value: 'oldest', label: 'الأقدم' },
    { value: 'name', label: 'الاسم' },
  ],
};