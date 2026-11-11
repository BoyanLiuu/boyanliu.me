import { describe, expect, it } from "vitest";
import { initials } from "./initials";

describe("initials", () => {
  it("takes the first letter of the first two words", () => {
    expect(initials("Shawn Liu")).toBe("SL");
    expect(initials("ada lovelace byron")).toBe("AL");
  });

  it("handles a single name and extra spaces", () => {
    expect(initials("  Cher ")).toBe("C");
  });
});
