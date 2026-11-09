import { z } from "zod";
import {
  bookmarksSchema,
  changelogSchema,
  experienceSchema,
  siteSchema,
} from "./schema.ts";

/** Generated JSON Schema files, keyed by path. */
export const jsonSchemas: Record<string, unknown> = {
  "content/site.schema.json": z.toJSONSchema(siteSchema, { io: "input" }),
  "content/experience.schema.json": z.toJSONSchema(experienceSchema, {
    io: "input",
  }),
  "content/bookmarks.schema.json": z.toJSONSchema(bookmarksSchema, {
    io: "input",
  }),
  "content/changelog.schema.json": z.toJSONSchema(changelogSchema, {
    io: "input",
  }),
};
