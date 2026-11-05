import { describe, expect, it } from "vitest";
import { collectTags, sortByDateDesc, visible } from "./content";

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
});
