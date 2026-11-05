import type { LinkCell } from "@/components/swiss/link-bar";
import { siteConfig } from "./site";

/** The contact cells used by the hero and the footer. */
export const contactCells: LinkCell[] = [
  { label: `${siteConfig.ui.resume} ↓`, href: "/resume", primary: true },
  {
    label: "Email",
    detail: siteConfig.author.email,
    href: `mailto:${siteConfig.author.email}`,
  },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "GitHub", href: siteConfig.social.github },
];
