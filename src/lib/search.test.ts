import { describe, expect, it } from "vitest";
import { buildSearchIndex } from "./search";

describe("buildSearchIndex", () => {
  const index = buildSearchIndex({
    posts: [{ slug: "a", title: "Post A", summary: "S", tags: ["go"] }],
    projects: [
      {
        slug: "p",
        title: "Proj",
        summary: "Sum",
        outcome: "10x",
        stack: ["rust"],
      },
    ],
    topics: ["go", "rust"],
  });

  it("includes projects, posts, pages and topics with site-relative links", () => {
    expect(index.map((i) => i.kind)).toEqual([
      "project",
      "post",
      "page",
      "page",
      "page",
      "page",
      "topic",
      "topic",
    ]);
    for (const item of index) expect(item.href.startsWith("/")).toBe(true);
  });

  it("makes stacks and tags searchable", () => {
    expect(index.find((i) => i.href === "/projects/p")?.keywords).toContain(
      "rust",
    );
    expect(index.find((i) => i.href === "/blog/a")?.keywords).toContain("go");
  });
});
