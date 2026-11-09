/** A contact link: the résumé, email or a social profile. */
export type LinkCell = {
  label: string;
  /** Longer text, e.g. the email address (shown as the link's tooltip). */
  detail?: string;
  href: string;
  primary?: boolean;
  /** Plausible tagged-event name recorded on click (when analytics is on). */
  event?: string;
};

import { events } from "@/lib/analytics";
import { siteConfig } from "./site";

/** The contact cells used by the hero and the footer. */
export const contactCells: LinkCell[] = [
  {
    label: siteConfig.ui.resume,
    href: "/resume.pdf",
    primary: true,
    event: events.resumeView,
  },
  {
    label: "Email",
    detail: siteConfig.author.email,
    href: `mailto:${siteConfig.author.email}`,
    event: events.emailClick,
  },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "GitHub", href: siteConfig.social.github },
];
