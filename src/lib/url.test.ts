import { describe, expect, it } from "vitest";
import { absoluteUrl, publisherName } from "./url";

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

describe("publisherName", () => {
  it("names known blogging platforms", () => {
    expect(publisherName("https://boyanliu.hashnode.dev/a-post")).toBe(
      "Hashnode",
    );
    expect(publisherName("https://medium.com/@me/a-post")).toBe("Medium");
    expect(publisherName("https://dev.to/me/a-post")).toBe("DEV");
  });

  it("falls back to the hostname without www", () => {
    expect(publisherName("https://www.example.com/post")).toBe("example.com");
  });
});
