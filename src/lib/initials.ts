/** Up to two initials from a name, e.g. "Shawn Liu" → "SL". */
export const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
