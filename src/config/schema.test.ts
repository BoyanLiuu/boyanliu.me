import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import experience from "../../content/experience.json";
import site from "../../content/site.json";
import { jsonSchemas } from "./json-schemas";
import { experienceSchema, siteSchema } from "./schema";

describe("content/site.json", () => {
  it("matches the site schema", () => {
    const result = siteSchema.safeParse(site);
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error.issues, null, 2),
    ).toBe(true);
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
