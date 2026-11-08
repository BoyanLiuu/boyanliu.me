import { Feed } from "feed";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "./url";

export type FeedPost = {
  title: string;
  summary: string;
  date: string;
  updated?: string;
  slug: string;
  tags: string[];
};

/** One Feed object, serialised as RSS 2.0, Atom 1.0 or JSON Feed 1 by the route handlers. */
export const buildFeed = (posts: FeedPost[]): Feed => {
  const home = absoluteUrl("/");
  const author = { name: siteConfig.author.name, link: home };
  const latest = posts.reduce(
    (max, p) => Math.max(max, Date.parse(p.updated ?? p.date)),
    0,
  );

  const feed = new Feed({
    id: home,
    link: home,
    title: `${siteConfig.name} — Writing`,
    description: siteConfig.description,
    language: siteConfig.locale.split("-")[0],
    copyright: `© ${new Date(latest || Date.now()).getUTCFullYear()} ${siteConfig.author.name}. All rights reserved.`,
    updated: latest ? new Date(latest) : undefined,
    author,
    feedLinks: {
      rss: absoluteUrl("/rss.xml"),
      atom: absoluteUrl("/atom.xml"),
      json: absoluteUrl("/feed.json"),
    },
  });

  for (const post of posts) {
    const url = absoluteUrl(`/blog/${post.slug}`);
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.summary,
      date: new Date(post.updated ?? post.date),
      published: new Date(post.date),
      author: [author],
      category: post.tags.map((name) => ({ name })),
    });
  }
  return feed;
};
