/** Bookmarks, loaded from content/bookmarks.json (validated at build). */
import data from "../../content/bookmarks.json";
import type { BookmarksData } from "@/config/schema";

export type Bookmark = BookmarksData["bookmarks"][number];

const all = (data as unknown as BookmarksData).bookmarks;

/** "github.com/TanStack/query" → "github.com"; strips www. */
export function hostOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** Newest first; ties keep file order. */
export function sortBookmarks<T extends { added: string }>(
  items: readonly T[],
): T[] {
  return [...items].sort((a, b) => Date.parse(b.added) - Date.parse(a.added));
}

export function getBookmarks(): Bookmark[] {
  return sortBookmarks(all);
}

export function getFavoriteBookmarks(): Bookmark[] {
  return getBookmarks().filter((b) => b.favorite);
}
