import { describe, expect, it } from "vitest";
import { buildFeed } from "./feed";

const posts = [
  {
    title: "New",
    summary: "S1",
    date: "2026-10-12",
    slug: "new",
    tags: ["aws"],
  },
  {
    title: "Old & <tricky>",
    summary: "S2",
    date: "2025-01-10",
    updated: "2025-02-01",
    slug: "old",
    tags: [],
  },
];

describe("buildFeed", () => {
  it("produces one RSS item per post with absolute links", () => {
    const rss = buildFeed(posts).rss2();
    expect(rss.match(/<item>/g)).toHaveLength(2);
    expect(rss).toMatch(/<link>https?:\/\/[^<]+\/blog\/new<\/link>/);
  });

  it("keeps special characters safe (CDATA or entity-escaped)", () => {
    const rss = buildFeed(posts).rss2();
    expect(rss).toMatch(
      /<!\[CDATA\[Old & <tricky>\]\]>|Old &amp; &lt;tricky&gt;/,
    );
    expect(rss).not.toMatch(/<title>Old & <tricky><\/title>/);
  });

  it("serialises Atom and JSON Feed", () => {
    const feed = buildFeed(posts);
    expect(feed.atom1()).toContain("<entry>");
    expect(JSON.parse(feed.json1()).items).toHaveLength(2);
  });
});
