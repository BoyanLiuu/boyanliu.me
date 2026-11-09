import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import experience from "../../content/experience.json";
import site from "../../content/site.json";
import { jsonSchemas } from "./json-schemas";
import { changelogSchema, experienceSchema, siteSchema } from "./schema";

describe("content/site.json", () => {
  it("matches the site schema", () => {
    const result = siteSchema.safeParse(site);
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error.issues, null, 2),
    ).toBe(true);
  });

  it("rejects an accent colour with too little contrast", () => {
    const pale = { ...site, theme: { ...site.theme, accent: "#ff8a80" } };
    const result = siteSchema.safeParse(pale);
    expect(result.success).toBe(false);
    expect(JSON.stringify(result.error?.issues)).toContain("4.5:1");
  });

  it("rejects unknown keys (typos)", () => {
    const typo = {
      ...site,
      social: { ...site.social, linkdin: "https://example.com" },
    };
    expect(siteSchema.safeParse(typo).success).toBe(false);
  });
});

describe("content/experience.json", () => {
  it("matches the experience schema", () => {
    const result = experienceSchema.safeParse(experience);
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error.issues, null, 2),
    ).toBe(true);
  });

  it("rejects malformed months", () => {
    const bad = {
      ...experience,
      roles: [{ ...experience.roles[0], start: "Jan 2023" }],
    };
    expect(experienceSchema.safeParse(bad).success).toBe(false);
  });
});

describe("generated JSON Schemas", () => {
  it("are up to date (run `pnpm schemas` if this fails)", () => {
    for (const [file, schema] of Object.entries(jsonSchemas)) {
      expect(JSON.parse(readFileSync(file, "utf8"))).toEqual(
        JSON.parse(JSON.stringify(schema)),
      );
    }
  });
});

describe("changelogSchema", () => {
  const entry = (version: string, date: string) => ({
    version,
    date,
    title: "Title",
    summary: "What changed.",
  });

  it("accepts the committed changelog", async () => {
    const { default: data } = await import("../../content/changelog.json");
    expect(changelogSchema.safeParse(data).success).toBe(true);
  });

  it("rejects entries that are not newest first", () => {
    const result = changelogSchema.safeParse({
      entries: [entry("1.0.0", "2026-01-01"), entry("1.1.0", "2026-02-01")],
    });
    expect(result.success).toBe(false);
  });

  it("rejects duplicate versions and non-semver versions", () => {
    expect(
      changelogSchema.safeParse({
        entries: [entry("1.0.0", "2026-02-01"), entry("1.0.0", "2026-01-01")],
      }).success,
    ).toBe(false);
    expect(
      changelogSchema.safeParse({ entries: [entry("v1", "2026-01-01")] })
        .success,
    ).toBe(false);
  });
});
