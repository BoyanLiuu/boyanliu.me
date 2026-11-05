import { sampleProjects, type Project } from "@/data/sample-projects";
import { countValues } from "./content";

export type { Project };

/** Ordered by `order`, then newest year. Data source becomes the content collection in 4.1. */
export function getProjects(): Project[] {
  return [...sampleProjects].sort(
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
