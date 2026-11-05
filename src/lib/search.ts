export type SearchItem = {
  kind: "project" | "post" | "page" | "topic";
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
}: {
  posts: PostLike[];
  projects: ProjectLike[];
  topics: string[];
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
    ...[
      { title: "Work", href: "/projects" },
      { title: "Writing", href: "/blog" },
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
