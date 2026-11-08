/** Bookmarks, loaded from content/bookmarks.json (validated at build). */
import data from "../../content/bookmarks.json";
import type { BookmarksData } from "@/config/schema";

export type Bookmark = BookmarksData["bookmarks"][number];

const all = (data as unknown as BookmarksData).bookmarks;

/** "github.com/TanStack/query" → "github.com"; strips www. */
export const hostOf = (url: string): string =>
  new URL(url).hostname.replace(/^www\./, "");

/** Newest first; ties keep file order. */
export const sortBookmarks = <T extends { added: string }>(
  items: readonly T[],
): T[] => [...items].sort((a, b) => Date.parse(b.added) - Date.parse(a.added));

export const getBookmarks = (): Bookmark[] => sortBookmarks(all);

export const getFavoriteBookmarks = (): Bookmark[] =>
  getBookmarks().filter((b) => b.favorite);
