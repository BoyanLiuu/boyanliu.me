import { describe, expect, it } from "vitest";
import { eventClass } from "./analytics";

describe("eventClass", () => {
  it("builds the Plausible tagged-event class when enabled", () => {
    expect(eventClass("Resume Download", true)).toBe(
      "plausible-event-name=Resume+Download",
    );
  });

  it("adds nothing when analytics is disabled", () => {
    expect(eventClass("Resume Download", false)).toBe("");
  });
});
