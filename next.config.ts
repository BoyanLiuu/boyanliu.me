import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import { siteConfig } from "./src/config/site";

const resumeFile = `${siteConfig.author.name.replace(/\s+/g, "-")}-Resume.pdf`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: `inline; filename="${resumeFile}"`,
          },
        ],
      },
    ];
  },
  // Cache Components is off: the site is static-first, and it disallows dynamicParams,
  // which we need for real 404s on unknown post slugs.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// withContentCollections must be the outermost plugin.
export default withContentCollections(nextConfig);
