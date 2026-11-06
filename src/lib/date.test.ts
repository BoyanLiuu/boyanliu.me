import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatMonthYear,
  formatMonthYearLong,
  isoDate,
} from "./date";

describe("date helpers", () => {
  it("formats a full date in UTC", () => {
    expect(formatDate("2026-10-12", "en-US")).toBe("Oct 12, 2026");
  });

  it("does not shift the day for late-UTC timestamps", () => {
    expect(formatDate("2026-10-12T23:30:00Z", "en-US")).toBe("Oct 12, 2026");
  });

  it("formats month and year", () => {
    expect(formatMonthYear("2026-08-03", "en-US")).toBe("Aug 2026");
  });

  it("returns an ISO day for <time dateTime>", () => {
    expect(isoDate("2026-05-21T10:00:00Z")).toBe("2026-05-21");
  });

  it("formats a long month heading", () => {
    expect(formatMonthYearLong("2026-11-05", "en-US")).toBe("November 2026");
  });
});
