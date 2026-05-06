export function Loading() {
  return (
    <div className="fixed inset-0 flex w-full min-h-screen flex-col items-center justify-center bg-white backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-[3px] border-gray-200 border-t-primary"></div>
        <div className="absolute">
          <span className="text-lg font-bold text-primary animate-pulse">عطاء</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-500">جاري التحميل...</p>
    </div>
  );
}