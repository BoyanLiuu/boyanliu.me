import { describe, expect, it } from "vitest";
import { buildSitemap } from "./sitemap";

describe("buildSitemap", () => {
  const map = buildSitemap({
    posts: [{ slug: "a", date: "2026-10-12" }],
    projects: [{ slug: "p" }],
    tags: ["go"],
  });

  it("uses absolute URLs only", () => {
    for (const entry of map) expect(entry.url).toMatch(/^https?:\/\//);
  });

  it("includes static pages, projects, posts and tags", () => {
    const paths = map.map((e) => new URL(e.url).pathname);
    expect(paths).toEqual(
      expect.arrayContaining([
        "/",
        "/blog",
        "/projects",
        "/projects/p",
        "/blog/a",
        "/tags/go",
      ]),
    );
  });
});
