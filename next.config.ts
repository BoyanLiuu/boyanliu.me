import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
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
