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
