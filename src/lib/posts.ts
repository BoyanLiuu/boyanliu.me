import { allPosts } from "content-collections";
import { collectTags, includeDrafts, sortByDateDesc, visible } from "./content";

export type Post = (typeof allPosts)[number];

export function getPosts(): Post[] {
  return sortByDateDesc(visible(allPosts, includeDrafts));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts(limit = 3): Post[] {
  return getPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getAllTags(): string[] {
  return collectTags(getPosts());
}
