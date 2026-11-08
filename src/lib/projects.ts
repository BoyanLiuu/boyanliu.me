import { allProjects } from "content-collections";
import { countValues, includeDrafts, visible } from "./content";

export type Project = (typeof allProjects)[number];

/** Ordered by `order`, then newest year. Drafts only in development. */
export const getProjects = (): Project[] =>
  visible(allProjects, includeDrafts).sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99) || b.year - a.year,
  );

export const getProjectBySlug = (slug: string): Project | undefined =>
  getProjects().find((project) => project.slug === slug);

export const getFeaturedProjects = (limit = 3): Project[] =>
  getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);

/** Skills derived from project stacks: [["go", 2], ["postgres", 1], …]. */
export const getSkillCounts = (): [string, number][] =>
  countValues(getProjects(), (project) => project.stack);
