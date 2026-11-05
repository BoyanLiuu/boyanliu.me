import { z } from "zod";
import { siteSchema } from "./schema.ts";

/** Generated JSON Schema files, keyed by path. */
export const jsonSchemas: Record<string, unknown> = {
  "content/site.schema.json": z.toJSONSchema(siteSchema, { io: "input" }),
};
