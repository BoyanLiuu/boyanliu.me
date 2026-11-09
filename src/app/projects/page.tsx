import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import Link from "next/link";
import { ProjectRow } from "@/components/projects/project-row";
import { Container, Display, Mark } from "@/components/swiss/layout";
import { getProjects, getSkillCounts } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: pageAlternates("/projects"),
  title: "Work",
  description: "Selected projects and case studies.",
};

export default function ProjectsIndex() {
  const projects = getProjects();
  const stacks = getSkillCounts().map(([name]) => name);

  return (
    <Container>
      <Display className="pt-10 lg:pt-14">
        Work
        <Mark />
      </Display>
      <nav
        aria-label="Filter by stack"
        className="mt-8 flex flex-wrap gap-x-4 border-b border-rule pb-3 text-small"
      >
        <span className="inline-block py-1.5 font-bold text-accent underline underline-offset-4">
          All
        </span>
        {stacks.map((stack) => (
          <Link
            key={stack}
            href={`/tags/${stack}`}
            className="inline-block py-1.5 hover:text-accent"
          >
            #{stack}
          </Link>
        ))}
      </nav>
      <div className="mt-2">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
