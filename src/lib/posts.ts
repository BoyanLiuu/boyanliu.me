import { allPosts } from "content-collections";
import { collectTags, includeDrafts, sortByDateDesc, visible } from "./content";

export type Post = (typeof allPosts)[number];

export const getPosts = (): Post[] =>
  sortByDateDesc(visible(allPosts, includeDrafts));

export const getPostBySlug = (slug: string): Post | undefined =>
  getPosts().find((post) => post.slug === slug);

export const getFeaturedPosts = (limit = 3): Post[] =>
  getPosts()
    .filter((post) => post.featured)
    .slice(0, limit);

export const getAllTags = (): string[] => collectTags(getPosts());
