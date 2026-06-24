export function generateSlug(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^؀-ۿݐ-ݿ‌‍\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
