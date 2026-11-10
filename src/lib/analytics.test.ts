import { describe, expect, it } from "vitest";
import { eventAttrs, markResumeVisit } from "./analytics";

describe("eventAttrs", () => {
  it("marks the link with the event name when click events are on", () => {
    expect(eventAttrs("Resume Download", true)).toEqual({
      "data-event": "Resume Download",
    });
  });

  it("adds nothing when click events are off or there is no event", () => {
    expect(eventAttrs("Resume Download", false)).toEqual({});
    expect(eventAttrs(undefined, true)).toEqual({});
  });
});

describe("markResumeVisit", () => {
  it("files résumé landings under /from-resume and drops the ref", () => {
    expect(markResumeVisit("https://boyanliu.me/?ref=resume")).toBe(
      "https://boyanliu.me/from-resume",
    );
    expect(
      markResumeVisit("https://boyanliu.me/projects/dark-room?ref=resume"),
    ).toBe("https://boyanliu.me/from-resume/projects/dark-room");
  });

  it("keeps other query parameters", () => {
    expect(
      markResumeVisit("https://boyanliu.me/blog?ref=resume&tag=react"),
    ).toBe("https://boyanliu.me/from-resume/blog?tag=react");
  });

  it("leaves every other URL unchanged", () => {
    for (const href of [
      "https://boyanliu.me/projects/dark-room",
      "https://boyanliu.me/?ref=github",
    ]) {
      expect(markResumeVisit(href)).toBe(href);
    }
  });
});
