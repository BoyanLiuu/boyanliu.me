import { siteConfig } from "@/config/site";

/** Turns a site-relative path into an absolute URL on the configured domain. */
export const absoluteUrl = (
  path = "/",
  base: string = siteConfig.url,
): string => new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
