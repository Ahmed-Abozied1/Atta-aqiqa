// أدوار الوصول للوحة التحكم
// ADMIN = صلاحيات كاملة | STAFF = موظف طلبات (يشوف الطلبات فقط)

export const ADMIN_ROLES = ["ADMIN", "STAFF"] as const;

/** يقدر يدخل لوحة التحكم أصلاً (أدمن كامل أو موظف طلبات) */
export function canAccessDashboard(role?: string | null): boolean {
  return role === "ADMIN" || role === "STAFF";
}

/** يقدر يدير الطلبات (أدمن كامل أو موظف طلبات) */
export function canManageOrders(role?: string | null): boolean {
  return role === "ADMIN" || role === "STAFF";
}

/** أدمن كامل الصلاحيات فقط (منتجات، حسابات، إحصائيات، تقييمات) */
export function isFullAdmin(role?: string | null): boolean {
  return role === "ADMIN";
}
