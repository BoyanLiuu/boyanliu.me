import { describe, expect, it } from "vitest";
import { absoluteUrl } from "./url";

describe("absoluteUrl", () => {
  it("joins a path onto the base", () => {
    expect(absoluteUrl("/blog/hello", "https://example.com")).toBe(
      "https://example.com/blog/hello",
    );
  });

  it("handles a trailing slash on the base and no leading slash on the path", () => {
    expect(absoluteUrl("blog", "https://example.com/")).toBe(
      "https://example.com/blog",
    );
  });

  it("defaults to the site root", () => {
    expect(absoluteUrl(undefined, "https://example.com")).toBe(
      "https://example.com/",
    );
  });
});
