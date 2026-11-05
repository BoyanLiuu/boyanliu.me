import { siteConfig } from "@/config/site";

/** Turns a site-relative path into an absolute URL on the configured domain. */
export function absoluteUrl(path = "/", base: string = siteConfig.url): string {
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}
