import Link from "next/link";
import { Frame } from "@/components/swiss/frame";
import { Label } from "@/components/swiss/layout";
import type { Project } from "@/lib/projects";

/** Secondary project: greyscale image (colour on hover), title and caption row. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <Link href={`/projects/${project.slug}`} className="group block">
        <Frame src={project.cover} alt={`${project.title} — cover`} muted />
        <h3 className="mt-3 font-display text-h2 font-bold group-hover:text-accent">
          {project.title}
        </h3>
      </Link>
      <div className="mt-1 flex flex-wrap justify-between gap-2">
        <Label>{project.outcome}</Label>
        <Label>
          {project.stack.join(" / ")} · {project.year}
        </Label>
      </div>
    </article>
  );
}
