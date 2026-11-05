import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import { siteConfig } from "./src/config/site";
import { validateContentFiles } from "./src/config/validate";

// Fail fast (dev and build) if content/*.json is invalid.
validateContentFiles();

const resumeFile = `${siteConfig.author.name.replace(/\s+/g, "-")}-Resume.pdf`;

const nextConfig: NextConfig = {
  // Résumé short links: /r and /p/<slug> carry ?ref=resume so analytics can tell résumé traffic apart.
  async redirects() {
    return [
      { source: "/r", destination: "/?ref=resume", permanent: false },
      {
        source: "/p/:slug",
        destination: "/projects/:slug?ref=resume",
        permanent: false,
      },
    ];
  },
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
