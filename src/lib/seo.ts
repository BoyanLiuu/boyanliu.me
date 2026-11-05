import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "./url";

/** Serialises JSON-LD safely for a <script> tag (no "</script>" breakout). */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Profile links that identify the same person (empty values removed). */
export function sameAs(): string[] {
  return [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.x,
  ].filter(Boolean);
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.jobTitle,
    url: absoluteUrl("/"),
    sameAs: sameAs(),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  summary: string;
  date: string;
  updated?: string;
  slug: string;
  tags: string[];
}) {
  return {
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
  };
}

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
export function pageAlternates(path: string): Metadata["alternates"] {
  return { canonical: path, types: feedTypes };
}

export function pageOpenGraph(
  og: NonNullable<Metadata["openGraph"]>,
): Metadata["openGraph"] {
  return {
    siteName: siteConfig.name,
    locale: siteConfig.locale.replace("-", "_"),
    ...og,
  };
}
