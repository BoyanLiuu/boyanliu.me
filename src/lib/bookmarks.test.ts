import { describe, expect, it } from "vitest";
import bookmarks from "../../content/bookmarks.json";
import { bookmarksSchema } from "@/config/schema";
import { hostOf, sortBookmarks } from "./bookmarks";

describe("bookmarks", () => {
  it("content/bookmarks.json is valid", () => {
    const result = bookmarksSchema.safeParse(bookmarks);
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error.issues, null, 2),
    ).toBe(true);
  });

  it("rejects duplicate URLs (ignoring case and trailing slash)", () => {
    const one = bookmarks.bookmarks[0];
    const dup = {
      ...bookmarks,
      bookmarks: [one, { ...one, url: `${one.url.toUpperCase()}/` }],
    };
    const result = bookmarksSchema.safeParse(dup);
    expect(result.success).toBe(false);
    expect(JSON.stringify(result.error?.issues)).toContain("duplicate");
  });

  it("derives a readable host", () => {
    expect(hostOf("https://www.joshwcomeau.com/css/")).toBe("joshwcomeau.com");
    expect(hostOf("https://github.com/TanStack/query")).toBe("github.com");
  });

  it("sorts newest first", () => {
    const sorted = sortBookmarks([
      { added: "2026-01-01" },
      { added: "2026-03-01" },
      { added: "2026-02-01" },
    ]);
    expect(sorted.map((b) => b.added)).toEqual([
      "2026-03-01",
      "2026-02-01",
      "2026-01-01",
    ]);
  });
});
