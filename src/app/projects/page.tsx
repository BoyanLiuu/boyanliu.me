import type { Metadata } from "next";
import Link from "next/link";
import { ProjectRow } from "@/components/projects/project-row";
import { Container, Display, Mark } from "@/components/swiss/layout";
import { getProjects, getSkillCounts } from "@/lib/projects";

export const metadata: Metadata = {
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
        className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-b border-rule pb-4 text-small"
      >
        <span className="font-bold text-accent underline underline-offset-4">
          All
        </span>
        {stacks.map((stack) => (
          <Link
            key={stack}
            href={`/tags/${stack}`}
            className="hover:text-accent"
          >
            {stack}
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
