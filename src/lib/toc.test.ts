import { describe, expect, it } from "vitest";
import { extractToc, stripInline } from "./toc";

describe("extractToc", () => {
  it("collects h2 and h3 headings with github-style ids", () => {
    const toc = extractToc(
      "# Title\n\n## Why it matters\n\ntext\n\n### Sub point\n\n#### Too deep",
    );
    expect(toc).toEqual([
      { depth: 2, title: "Why it matters", id: "why-it-matters" },
      { depth: 3, title: "Sub point", id: "sub-point" },
    ]);
  });

  it("ignores headings inside code fences", () => {
    const toc = extractToc(
      "## Real\n\n```md\n## Not a heading\n```\n\n## Also real",
    );
    expect(toc.map((t) => t.id)).toEqual(["real", "also-real"]);
  });

  it("suffixes duplicates the same way rehype-slug does", () => {
    const toc = extractToc("## Results\n\n## Results");
    expect(toc.map((t) => t.id)).toEqual(["results", "results-1"]);
  });

  it("strips inline markup from titles", () => {
    expect(
      stripInline("Using `fetch` with **retries** and [docs](https://x.y)"),
    ).toBe("Using fetch with retries and docs");
  });
});
