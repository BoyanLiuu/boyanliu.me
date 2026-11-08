import { describe, expect, it } from "vitest";
import { type ContributionDay, githubUser, toMonths } from "./github";

const day = (d: string, c = 0): ContributionDay => ({ d, c, l: c ? 2 : 0 });

describe("githubUser", () => {
  it("reads the login from a profile URL", () => {
    expect(githubUser("https://github.com/BoyanLiuu")).toBe("BoyanLiuu");
    expect(githubUser("https://github.com/BoyanLiuu/")).toBe("BoyanLiuu");
    expect(githubUser("not a url")).toBeUndefined();
  });
});

describe("toMonths", () => {
  // November 2026 starts on a Sunday; December 2026 on a Tuesday.
  const days = [
    ...Array.from({ length: 30 }, (_, i) =>
      day(`2026-11-${String(i + 1).padStart(2, "0")}`),
    ),
    day("2026-12-01", 3),
    day("2026-12-02"),
  ];
  const [november, december] = toMonths(days);

  it("labels the first and last months with the year", () => {
    expect(november!.label).toBe("Nov ’26");
    expect(december!.label).toBe("Dec ’26");
  });

  it("drops whole empty weeks before the window starts", () => {
    // Window starts Thursday Nov 19, 2026: weeks of Nov 1 and Nov 8 are empty and removed.
    const [partial] = toMonths([day("2026-11-19"), day("2026-11-20", 1)]);
    expect(partial!.weeks).toHaveLength(1);
    expect(partial!.weeks[0]![4]!.d).toBe("2026-11-19");
  });

  it("lays days out as Sunday-first week columns", () => {
    expect(november!.weeks).toHaveLength(5);
    expect(november!.weeks[0]![0]!.d).toBe("2026-11-01");
    expect(december!.weeks[0]!.slice(0, 2)).toEqual([null, null]);
    expect(december!.weeks[0]![2]).toEqual(day("2026-12-01", 3));
  });
});
