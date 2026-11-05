import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { buildSitemap } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap({ posts: getPosts(), projects: getProjects() });
}
