/** Pure helpers shared by posts and projects. No imports from generated content, so they are unit-testable. */

export type Dated = { date: string };
export type Draftable = { draft?: boolean };
export type Tagged = { tags: string[] };

/** Newest first. Does not mutate the input. */
export function sortByDateDesc<T extends Dated>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

/** Drafts are visible in development and hidden in production builds. */
export function visible<T extends Draftable>(
  items: readonly T[],
  includeDrafts: boolean,
): T[] {
  return includeDrafts ? [...items] : items.filter((item) => !item.draft);
}

/** Unique tags across items, sorted alphabetically. */
export function collectTags<T extends Tagged>(items: readonly T[]): string[] {
  return [...new Set(items.flatMap((item) => item.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}

/** Counts values across items, most common first (ties alphabetical). */
export function countValues<T>(
  items: readonly T[],
  pick: (item: T) => string[],
): [string, number][] {
  const counts = new Map<string, number>();
  for (const item of items)
    for (const value of pick(item))
      counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export const includeDrafts = process.env.NODE_ENV !== "production";

export type Page<T> = { items: T[]; page: number; pages: number };

/** 1-based pagination. Out-of-range pages return no items (callers turn that into a 404). */
export function paginate<T>(
  items: readonly T[],
  page: number,
  perPage: number,
): Page<T> {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const valid = Number.isInteger(page) && page >= 1 && page <= pages;
  return {
    items: valid ? items.slice((page - 1) * perPage, page * perPage) : [],
    page,
    pages,
  };
}
