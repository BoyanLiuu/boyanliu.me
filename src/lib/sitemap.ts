import type { MetadataRoute } from "next";
import { absoluteUrl } from "./url";

type Dated = { slug: string; date: string; updated?: string };

/** Every public URL, absolute. Pure, so it can be unit-tested with fixtures. */
export function buildSitemap({
  posts,
  projects,
  tags = [],
}: {
  posts: Dated[];
  projects: { slug: string }[];
  tags?: string[];
}): MetadataRoute.Sitemap {
  const latestPost = posts.reduce(
    (max, p) => Math.max(max, Date.parse(p.updated ?? p.date)),
    0,
  );
  const lastModified = latestPost ? new Date(latestPost) : undefined;

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/projects"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/bookmarks"),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/resume"), changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: absoluteUrl(`/tags/${tag}`),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
