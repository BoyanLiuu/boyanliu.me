import Script from "next/script";
import { siteConfig } from "@/config/site";

/** Cookie-free Plausible analytics (pageviews, outbound links, tagged events). Off unless features.analytics. */
export function Analytics() {
  if (!siteConfig.features.analytics) return null;
  return (
    <Script
      defer
      data-domain={siteConfig.analytics.domain}
      src={siteConfig.analytics.scriptSrc}
      strategy="afterInteractive"
    />
  );
}
