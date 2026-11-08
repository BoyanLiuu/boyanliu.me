import { jsonLdString } from "@/lib/seo";

/** Structured data for search engines. */
export const JsonLd = ({ data }: { data: unknown }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
  />
);
