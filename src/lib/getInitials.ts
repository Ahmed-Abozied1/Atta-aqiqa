export function getInitials(fullName: string): string {
  if (!fullName) return "";
  const words = fullName.trim().split(/\s+/);
  return words.slice(0, 2).map(word => word[0].toUpperCase()).join("");
}