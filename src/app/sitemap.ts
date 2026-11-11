import type { MetadataRoute } from "next";
import { getBookmarks } from "@/lib/bookmarks";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { allTopics } from "@/lib/relations";
import { buildSitemap } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  // Cross-posts are canonical elsewhere, so they stay out of the sitemap.
  const posts = getPosts().filter((post) => !post.canonical);
  const projects = getProjects();
  return buildSitemap({
    posts,
    projects,
    tags: allTopics(posts, projects, getBookmarks()),
  });
}
