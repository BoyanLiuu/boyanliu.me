/** Pure relationship helpers between posts and projects (unit-testable with fixtures). */

type PostLike = { slug: string; tags: string[]; projects: string[] };
type ProjectLike = { slug: string; stack: string[] };

export function postsForProject<P extends PostLike>(
  posts: readonly P[],
  projectSlug: string,
): P[] {
  return posts.filter((post) => post.projects.includes(projectSlug));
}

export function projectsForPost<J extends ProjectLike>(
  projects: readonly J[],
  post: PostLike,
): J[] {
  return projects.filter((project) => post.projects.includes(project.slug));
}

/** Topics are post tags and project stacks combined, so /tags/go lists both. */
export function allTopics(
  posts: readonly PostLike[],
  projects: readonly ProjectLike[],
): string[] {
  return [
    ...new Set([
      ...posts.flatMap((p) => p.tags),
      ...projects.flatMap((p) => p.stack),
    ]),
  ].sort((a, b) => a.localeCompare(b));
}

export function itemsForTopic<P extends PostLike, J extends ProjectLike>(
  topic: string,
  posts: readonly P[],
  projects: readonly J[],
): { posts: P[]; projects: J[] } {
  return {
    posts: posts.filter((post) => post.tags.includes(topic)),
    projects: projects.filter((project) => project.stack.includes(topic)),
  };
}

type Dated = { slug: string; tags: string[] };

/** Posts sharing the most tags with `post` (ties keep the input order, i.e. newest first). */
export function relatedPosts<P extends Dated>(
  post: P,
  posts: readonly P[],
  limit = 3,
): P[] {
  return posts
    .filter((other) => other.slug !== post.slug)
    .map((other, index) => ({
      other,
      index,
      shared: other.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || a.index - b.index)
    .slice(0, limit)
    .map(({ other }) => other);
}

/** Neighbours in a newest-first list: `newer` is the previous item, `older` the next. */
export function adjacent<P extends { slug: string }>(
  posts: readonly P[],
  slug: string,
) {
  const i = posts.findIndex((post) => post.slug === slug);
  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}

type Serial = {
  slug: string;
  date: string;
  series?: string;
  seriesOrder?: number;
};

/** All parts of a series in reading order (seriesOrder, then oldest first). */
export function seriesParts<P extends Serial>(
  posts: readonly P[],
  series: string,
): P[] {
  return posts
    .filter((post) => post.series === series)
    .sort(
      (a, b) =>
        (a.seriesOrder ?? Number.MAX_SAFE_INTEGER) -
          (b.seriesOrder ?? Number.MAX_SAFE_INTEGER) ||
        Date.parse(a.date) - Date.parse(b.date),
    );
}
