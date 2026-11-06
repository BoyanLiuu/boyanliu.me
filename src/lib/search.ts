export type SearchItem = {
  kind: "project" | "post" | "bookmark" | "page" | "topic";
  title: string;
  href: string;
  summary?: string;
  keywords: string[];
};

type PostLike = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
};
type BookmarkLike = {
  url: string;
  title: string;
  note: string;
  tags: string[];
  kind: string;
};
type ProjectLike = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  stack: string[];
};

/** The static search index served at /search.json. */
export function buildSearchIndex({
  posts,
  projects,
  topics,
  bookmarks = [],
}: {
  posts: PostLike[];
  projects: ProjectLike[];
  topics: string[];
  bookmarks?: BookmarkLike[];
}): SearchItem[] {
  return [
    ...projects.map((p) => ({
      kind: "project" as const,
      title: p.title,
      href: `/projects/${p.slug}`,
      summary: p.outcome,
      keywords: [...p.stack, p.summary],
    })),
    ...posts.map((p) => ({
      kind: "post" as const,
      title: p.title,
      href: `/blog/${p.slug}`,
      summary: p.summary,
      keywords: p.tags,
    })),
    ...bookmarks.map((b) => ({
      kind: "bookmark" as const,
      title: b.title,
      href: b.url,
      summary: b.note,
      keywords: [...b.tags, b.kind],
    })),
    ...[
      { title: "Work", href: "/projects" },
      { title: "Writing", href: "/blog" },
      { title: "Bookmarks", href: "/bookmarks" },
      { title: "About", href: "/about" },
      { title: "Résumé", href: "/resume" },
    ].map((p) => ({ kind: "page" as const, ...p, keywords: [] })),
    ...topics.map((t) => ({
      kind: "topic" as const,
      title: `#${t}`,
      href: `/tags/${t}`,
      keywords: [t],
    })),
  ];
}
