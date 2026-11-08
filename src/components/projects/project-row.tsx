import Link from "next/link";
import { Frame } from "@/components/swiss/frame";
import { Label, Row } from "@/components/swiss/layout";
import type { Project } from "@/lib/projects";

/** Index row: thumbnail · title and summary · outcome · stack and year. */
export const ProjectRow = ({ project }: { project: Project }) => (
  <Row className="items-start gap-y-3">
    <Link
      href={`/projects/${project.slug}`}
      className="col-span-4 md:col-span-3 lg:col-span-3"
    >
      <Frame src={project.cover} alt={project.coverAlt} muted />
    </Link>
    <div className="col-span-4 md:col-span-5 lg:col-span-4">
      <h2 className="font-display text-h2 font-bold">
        <Link href={`/projects/${project.slug}`} className="hover:text-accent">
          {project.title}
        </Link>
      </h2>
      <p className="mt-2 text-body">{project.summary}</p>
    </div>
    <p className="col-span-4 font-display text-h3 font-bold text-accent md:col-span-5 lg:col-span-3">
      {project.outcome}
    </p>
    <div className="col-span-4 md:col-span-3 lg:col-span-2 lg:text-right">
      <Label className="block">{project.stack.join(" / ")}</Label>
      <Label className="mt-1 block">{project.year}</Label>
    </div>
  </Row>
);
