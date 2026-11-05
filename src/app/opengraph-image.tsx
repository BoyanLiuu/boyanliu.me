import { siteConfig } from "@/config/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = `${siteConfig.author.name} — ${siteConfig.author.jobTitle}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Portfolio",
    title: siteConfig.author.name,
    footer: siteConfig.author.jobTitle,
  });
}
