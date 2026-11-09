/**
 * Build-time validation of content/*.json. Imported by next.config.ts, so `next dev` and
 * `next build` stop with a readable message when the data is wrong. Node-only.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import {
  bookmarksSchema,
  changelogSchema,
  experienceSchema,
  siteSchema,
} from "./schema";

const readJson = (file: string): unknown =>
  JSON.parse(readFileSync(join(process.cwd(), file), "utf8"));

export const validateContentFiles = (): void => {
  const checks: [string, z.ZodType][] = [
    ["content/site.json", siteSchema],
    ["content/experience.json", experienceSchema],
    ["content/bookmarks.json", bookmarksSchema],
    ["content/changelog.json", changelogSchema],
  ];
  const errors: string[] = [];
  for (const [file, schema] of checks) {
    const result = schema.safeParse(readJson(file));
    if (!result.success)
      errors.push(`${file}\n${z.prettifyError(result.error)}`);
  }
  if (errors.length > 0) {
    throw new Error(
      `Invalid content configuration:\n\n${errors.join("\n\n")}\n`,
    );
  }
};
