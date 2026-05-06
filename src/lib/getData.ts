export async function getData<T>(endpoint: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';

  try {
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'حدث خطأ غير متوقع',
      }));

      throw new Error(error.error || 'حدث خطأ أثناء جلب البيانات');
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'تعذر الاتصال بالسيرفر، حاول مرة أخرى'
    );
  }
}