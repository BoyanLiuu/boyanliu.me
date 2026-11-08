import Link from "next/link";
import { Frame } from "@/components/swiss/frame";
import { Label } from "@/components/swiss/layout";
import type { Project } from "@/lib/projects";

/** Featured project: colour screenshot across 6 of 10 columns, facts beside it. */
export const ProjectFeature = ({ project }: { project: Project }) => (
  <article className="grid grid-cols-4 gap-x-4 border-t border-rule pt-5 md:grid-cols-8 md:gap-x-6 lg:grid-cols-10">
    <Link
      href={`/projects/${project.slug}`}
      className="col-span-4 md:col-span-8 lg:col-span-6"
    >
      <Frame src={project.cover} alt={project.coverAlt} priority />
    </Link>
    <div className="col-span-4 mt-5 md:col-span-8 lg:col-span-4 lg:mt-0">
      <Label>
        {project.year} — {project.role}
      </Label>
      <h3 className="mt-2 font-display text-h1 font-bold">
        <Link href={`/projects/${project.slug}`} className="hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mt-4 text-body">{project.summary}</p>
      <p className="mt-4 font-display text-h2 font-bold text-accent">
        {project.outcome}
      </p>
      <Label className="mt-3 block">{project.stack.join(" / ")}</Label>
    </div>
  </article>
);
