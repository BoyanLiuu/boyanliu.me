import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("keeps a custom text size alongside a text colour", () => {
    expect(cn("text-ink", "text-display")).toBe("text-ink text-display");
  });

  it("lets a later custom text size override an earlier one", () => {
    expect(cn("text-h1", "text-h2")).toBe("text-h2");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b");
  });
});
