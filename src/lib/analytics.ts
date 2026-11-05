import { siteConfig } from "@/config/site";

/**
 * Plausible "tagged events": a class on a link records a named event when it is clicked.
 * Returns "" when analytics is off, so markup is unchanged.
 */
export function eventClass(
  name: string,
  enabled: boolean = siteConfig.features.analytics,
): string {
  return enabled
    ? `plausible-event-name=${name.trim().replace(/\s+/g, "+")}`
    : "";
}

export const events = {
  resumeView: "Resume View",
  resumeDownload: "Resume Download",
  emailClick: "Email Click",
} as const;
