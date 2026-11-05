import { describe, expect, it } from "vitest";
import { blogPostingJsonLd, jsonLdString } from "./seo";

describe("seo helpers", () => {
  it("escapes < so JSON-LD cannot close the script tag", () => {
    expect(jsonLdString({ x: "</script><b>" })).toBe(
      '{"x":"\\u003c/script>\\u003cb>"}',
    );
  });

  it("builds BlogPosting with absolute URLs and a modified date", () => {
    const ld = blogPostingJsonLd({
      title: "T",
      summary: "S",
      date: "2026-10-12",
      slug: "t",
      tags: ["a", "b"],
    });
    expect(ld.url).toMatch(/^https?:\/\/.+\/blog\/t$/);
    expect(ld.dateModified).toBe("2026-10-12");
    expect(ld.keywords).toBe("a, b");
  });
});
