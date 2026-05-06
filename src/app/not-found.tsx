import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="container text-center px-4">
        <div className="max-w-md mx-auto">
          <h1 className="heading-1 text-primary mb-4">404</h1>
          <h2 className="heading-4-bold text-title mb-4">الصفحة غير موجودة</h2>
          <p className="text-regular-normal text-paragraph mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-5v-7H9v7H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}