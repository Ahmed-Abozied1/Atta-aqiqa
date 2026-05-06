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

  // 1. إذا كان المستخدم ADMIN ويحاول فتح الصفحة الرئيسية '/'
  if (pathname === '/') {
    if (session?.user && (session.user as any).role === "ADMIN") {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 2. حماية مسار الأدمن من المستخدمين العاديين
  if (pathname.startsWith('/admin')) {
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// الـ config يبقى كما هو لتحديد المسارات المستهدفة
export const config = {
  matcher: ['/', '/admin/:path*'],
};