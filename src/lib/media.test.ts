import { describe, expect, it } from "vitest";
import { isSvg, webmSibling } from "./media";

describe("media helpers", () => {
  it("detects SVG sources", () => {
    expect(isSvg("/projects/a/cover.svg")).toBe(true);
    expect(isSvg("/projects/a/cover.SVG?v=2")).toBe(true);
    expect(isSvg("/projects/a/shot.png")).toBe(false);
  });

  it("derives the WebM sibling of an MP4", () => {
    expect(webmSibling("/p/demo.mp4")).toBe("/p/demo.webm");
    expect(webmSibling("/p/demo.webm")).toBeUndefined();
  });
});
