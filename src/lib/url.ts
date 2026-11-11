import { siteConfig } from "@/config/site";

/** Turns a site-relative path into an absolute URL on the configured domain. */
export const absoluteUrl = (
  path = "/",
  base: string = siteConfig.url,
): string => new URL(path, base.endsWith("/") ? base : `${base}/`).toString();

const publishers: [RegExp, string][] = [
  [/(^|\.)hashnode\.(dev|com)$/, "Hashnode"],
  [/(^|\.)medium\.com$/, "Medium"],
  [/(^|\.)dev\.to$/, "DEV"],
];

/** The name of the site a URL belongs to, e.g. "Hashnode" for *.hashnode.dev; otherwise its hostname. */
export const publisherName = (href: string): string => {
  const host = new URL(href).hostname.replace(/^www\./, "");
  return publishers.find(([pattern]) => pattern.test(host))?.[1] ?? host;
};
