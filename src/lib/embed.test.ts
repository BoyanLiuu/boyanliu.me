import { describe, expect, it } from "vitest";
import { isAllowedPlayground, isYouTubeId } from "./embed";

describe("embed allowlist", () => {
  it("accepts https StackBlitz and CodeSandbox URLs", () => {
    expect(
      isAllowedPlayground("https://stackblitz.com/edit/demo?embed=1"),
    ).toBe(true);
    expect(isAllowedPlayground("https://codesandbox.io/embed/abc")).toBe(true);
  });

  it("rejects other hosts, look-alikes and non-https", () => {
    expect(isAllowedPlayground("https://evil.com/stackblitz.com")).toBe(false);
    expect(isAllowedPlayground("https://stackblitz.com.evil.com/x")).toBe(
      false,
    );
    expect(isAllowedPlayground("http://stackblitz.com/edit/x")).toBe(false);
    expect(isAllowedPlayground("not a url")).toBe(false);
  });

  it("validates YouTube ids", () => {
    expect(isYouTubeId("dQw4w9WgXcQ")).toBe(true);
    expect(isYouTubeId('x"><script>')).toBe(false);
  });
});
