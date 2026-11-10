import { siteConfig } from "@/config/site";

/** Named click events. Vercel only records them on Pro plans, so they are off unless `analytics.customEvents`. */
export const events = {
  resumeView: "Resume View",
  resumeDownload: "Resume Download",
  emailClick: "Email Click",
  linkedinClick: "LinkedIn Click",
  githubClick: "GitHub Click",
} as const;

const clickEventsOn =
  siteConfig.features.analytics && siteConfig.analytics.customEvents;

/**
 * Marks a link so <Analytics> sends `name` as a custom event when it is clicked.
 * Returns no attributes when click events are off, so markup is unchanged.
 */
export const eventAttrs = (
  name: string | undefined,
  enabled: boolean = clickEventsOn,
): { "data-event"?: string } => (enabled && name ? { "data-event": name } : {});

/** Page path under which résumé visits are filed. */
export const RESUME_VISIT_PREFIX = "/from-resume";

/**
 * Résumé short links (/r, /p/<slug>) land with ?ref=resume. Vercel's Hobby plan has no query or
 * UTM reports, so the page view is filed under /from-resume/<path> instead: the Pages panel then
 * lists résumé visits on their own. Other URLs pass through unchanged.
 */
export const markResumeVisit = (href: string): string => {
  const url = new URL(href);
  if (url.searchParams.get("ref") !== "resume") return href;
  url.searchParams.delete("ref");
  url.pathname = `${RESUME_VISIT_PREFIX}${url.pathname === "/" ? "" : url.pathname}`;
  return url.toString();
};
