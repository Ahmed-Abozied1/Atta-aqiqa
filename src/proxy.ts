import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth'; // تأكد من مسار ملف الـ auth

// يجب أن يكون الاسم "proxy" أو export default
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // جلب الجلسة
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const role = (session?.user as any)?.role;

  // 1. توجيه المستخدم من الصفحة الرئيسية '/' حسب دوره
  if (pathname === '/') {
    if (session?.user && role === "ADMIN") {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (session?.user && role === "STAFF") {
      return NextResponse.redirect(new URL('/admin/orders', request.url));
    }
  }

  // 2. حماية مسار الأدمن
  if (pathname.startsWith('/admin')) {
    // مسموح فقط للأدمن الكامل أو موظف الطلبات
    if (!session || (role !== "ADMIN" && role !== "STAFF")) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // موظف الطلبات (STAFF) يوصل للطلبات وصفحته الشخصية فقط
    if (role === "STAFF") {
      const allowed =
        pathname.startsWith('/admin/orders') ||
        pathname.startsWith('/admin/profile');
      if (!allowed) {
        return NextResponse.redirect(new URL('/admin/orders', request.url));
      }
    }
  }

  return NextResponse.next();
}

// الـ config يبقى كما هو لتحديد المسارات المستهدفة
export const config = {
  matcher: ['/', '/admin/:path*'],
};