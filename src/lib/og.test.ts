import { describe, expect, it } from "vitest";
import { ogTitleSize } from "./og";

describe("ogTitleSize", () => {
  it("shrinks as titles get longer", () => {
    const sizes = [
      "Pulse",
      "Cutting cold starts on Lambda",
      "A".repeat(70),
      "A".repeat(100),
    ].map(ogTitleSize);
    expect(sizes).toEqual([...sizes].sort((a, b) => b - a));
    expect(sizes[0]).toBe(120);
  });
});
