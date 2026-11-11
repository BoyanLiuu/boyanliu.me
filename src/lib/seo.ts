import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "./url";

/** Serialises JSON-LD safely for a <script> tag (no "</script>" breakout). */
export const jsonLdString = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");

/** Profile links that identify the same person (empty values removed). */
export const sameAs = (): string[] =>
  [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.x,
  ].filter(Boolean);

export const personJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.jobTitle,
  url: absoluteUrl("/"),
  ...(siteConfig.author.photo && {
    image: absoluteUrl(siteConfig.author.photo),
  }),
  sameAs: sameAs(),
});

export const blogPostingJsonLd = (post: {
  title: string;
  summary: string;
  date: string;
  updated?: string;
  slug: string;
  tags: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.summary,
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  keywords: post.tags.join(", "),
  url: absoluteUrl(`/blog/${post.slug}`),
  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: absoluteUrl("/"),
  },
});

/** Feed links advertised on every page. */
export const feedTypes = {
  "application/rss+xml": "/rss.xml",
  "application/atom+xml": "/atom.xml",
  "application/feed+json": "/feed.json",
};

/**
 * Next.js merges metadata shallowly: a page's `alternates` or `openGraph` replaces the layout's.
 * These helpers re-include the site defaults so canonical URLs and feed links never drop out.
 */
export const pageAlternates = (path: string): Metadata["alternates"] => ({
  canonical: path,
  types: feedTypes,
});

export const pageOpenGraph = (
  og: NonNullable<Metadata["openGraph"]>,
): Metadata["openGraph"] => ({
  siteName: siteConfig.name,
  locale: siteConfig.locale.replace("-", "_"),
  ...og,
});
