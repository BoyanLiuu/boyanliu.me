/**
 * Site settings, loaded from content/site.json (the only place to edit them).
 * The JSON is validated against src/config/schema.ts at build time (see next.config.ts),
 * so this module only types it and applies the NEXT_PUBLIC_SITE_URL override.
 * It deliberately does not import zod at runtime, keeping it out of client bundles.
 */
import data from "../../content/site.json";
import type { SiteData } from "./schema";

export type SiteConfig = Omit<SiteData, "$schema">;
export type Availability = SiteConfig["author"]["availability"];
export type NavItem = SiteConfig["nav"][number];

const site = data as unknown as SiteConfig; // validated at build; JSON imports widen literal types

export const siteConfig: SiteConfig = {
  ...site,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? site.url,
};
