import { describe, expect, it } from "vitest";
import {
  collectTags,
  countValues,
  pageNumbers,
  paginate,
  sortByDateDesc,
  visible,
} from "./content";

const fixtures = [
  { slug: "old", date: "2025-01-10", draft: false, tags: ["go", "kafka"] },
  { slug: "draft", date: "2026-11-01", draft: true, tags: ["rust"] },
  { slug: "new", date: "2026-10-12", draft: false, tags: ["aws", "go"] },
];

describe("content helpers", () => {
  it("sorts newest first without mutating the input", () => {
    const sorted = sortByDateDesc(fixtures);
    expect(sorted.map((p) => p.slug)).toEqual(["draft", "new", "old"]);
    expect(fixtures[0].slug).toBe("old");
  });

  it("hides drafts unless drafts are included", () => {
    expect(visible(fixtures, false).map((p) => p.slug)).toEqual(["old", "new"]);
    expect(visible(fixtures, true)).toHaveLength(3);
  });

  it("collects unique, sorted tags", () => {
    expect(collectTags(fixtures)).toEqual(["aws", "go", "kafka", "rust"]);
  });

  it("counts values, most common first", () => {
    expect(countValues(fixtures, (p) => p.tags)).toEqual([
      ["go", 2],
      ["aws", 1],
      ["kafka", 1],
      ["rust", 1],
    ]);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 45 }, (_, i) => i);

  it("splits into pages of the given size", () => {
    expect(paginate(items, 1, 20).items).toHaveLength(20);
    expect(paginate(items, 3, 20).items).toEqual([40, 41, 42, 43, 44]);
    expect(paginate(items, 1, 20).pages).toBe(3);
  });

  it("returns nothing for out-of-range or invalid pages", () => {
    expect(paginate(items, 4, 20).items).toEqual([]);
    expect(paginate(items, 0, 20).items).toEqual([]);
    expect(paginate(items, 1.5, 20).items).toEqual([]);
  });

  it("always has at least one page", () => {
    expect(paginate([], 1, 20).pages).toBe(1);
  });
});

describe("pageNumbers", () => {
  it("lists every page up to 7", () => {
    expect(pageNumbers(1, 1)).toEqual([1]);
    expect(pageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("keeps first, last and neighbours with gaps beyond 7", () => {
    expect(pageNumbers(1, 20)).toEqual([1, 2, 3, 4, 5, "…", 20]);
    expect(pageNumbers(10, 20)).toEqual([1, "…", 9, 10, 11, "…", 20]);
    expect(pageNumbers(20, 20)).toEqual([1, "…", 16, 17, 18, 19, 20]);
  });
});
