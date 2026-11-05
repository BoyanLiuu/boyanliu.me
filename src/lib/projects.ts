import { allProjects } from "content-collections";
import { countValues, includeDrafts, visible } from "./content";

export type Project = (typeof allProjects)[number];

/** Ordered by `order`, then newest year. Drafts only in development. */
export function getProjects(): Project[] {
  return visible(allProjects, includeDrafts).sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99) || b.year - a.year,
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

/** Skills derived from project stacks: [["go", 2], ["postgres", 1], …]. */
export function getSkillCounts(): [string, number][] {
  return countValues(getProjects(), (project) => project.stack);
}
