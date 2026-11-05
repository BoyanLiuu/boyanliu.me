import { describe, expect, it } from "vitest";
import { contrast } from "./color";

describe("contrast", () => {
  it("matches known WCAG ratios", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 0);
    expect(contrast("#e30613", "#ffffff")).toBeGreaterThan(4.5);
    expect(contrast("#ff3b30", "#000000")).toBeGreaterThan(4.5);
  });

  it("flags low-contrast accents", () => {
    expect(contrast("#ff8a80", "#ffffff")).toBeLessThan(4.5);
  });
});
