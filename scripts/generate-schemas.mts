/**
 * Writes content/*.schema.json from the zod schemas, for editor autocomplete and hover docs.
 *   pnpm schemas
 * A unit test fails if the committed files are out of date.
 */
import { writeFileSync } from "node:fs";
import { jsonSchemas } from "../src/config/json-schemas.ts";

for (const [file, schema] of Object.entries(jsonSchemas)) {
  writeFileSync(file, `${JSON.stringify(schema, null, 2)}\n`);
  console.log(`Wrote ${file}`);
}
