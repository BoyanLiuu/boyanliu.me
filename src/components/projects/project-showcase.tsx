import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Label } from "@/components/swiss/layout";
import { Pill } from "@/components/ui/pill";
import { isSvg } from "@/lib/media";
import type { Project } from "@/lib/projects";

const card =
  "stack-card group grid overflow-hidden rounded-card border border-rule bg-wash lg:min-h-[27rem] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]";

/**
 * Home-page case study card: copy and a "Read case study" pill on the left,
 * the cover as a screenshot that bleeds off the card's right and bottom edges.
 * Motion: the card rises in on scroll and its art settles from 110%; hovering the card zooms
 * the art, and hovering the pill turns it accent and slides its arrow in. On desktop the cards stick and stack
 * as you scroll (`.stack-card`); `index` sets each card's stacking offset and alternating tilt.
 */
export function ProjectShowcase({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const first = index === 0;
  const href = `/projects/${project.slug}`;
  const content = (
    <>
      <div className="flex flex-col p-6 md:p-10 lg:py-12 lg:pr-8 lg:pl-12">
        <Label className="text-muted">
          {project.year} · {project.role}
        </Label>
        <h3 className="mt-3 font-display text-h2 font-bold text-balance">
          {project.title}
        </h3>
        <p className="mt-4 text-body text-muted">{project.summary}</p>
        <p className="mt-4 font-display text-h3 font-bold text-accent">
          {project.outcome}
        </p>
        <div className="mt-8 lg:mt-auto lg:pt-8">
          <Pill href={href} tone="ink" size="lg" className="text-[0.95rem]">
            Read case study<span className="sr-only">: {project.title}</span>
          </Pill>
        </div>
      </div>
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative mx-6 aspect-[16/10] md:mx-10 lg:m-0 lg:aspect-auto"
      >
        <span className="absolute inset-x-0 top-0 bottom-0 overflow-hidden rounded-t-sm border border-b-0 border-rule bg-paper shadow-lift lg:top-12 lg:right-0 lg:rounded-tr-none lg:border-r-0">
          {isSvg(project.cover) ? (
            // eslint-disable-next-line @next/next/no-img-element -- SVGs don't benefit from the image optimiser
            <img
              src={project.cover}
              alt=""
              loading={first ? "eager" : "lazy"}
              className="card-art size-full object-cover object-top-left"
            />
          ) : (
            <Image
              src={project.cover}
              alt=""
              fill
              priority={first}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="card-art object-cover object-top-left"
            />
          )}
        </span>
      </Link>
    </>
  );
  return (
    <Reveal
      as="article"
      variant="card"
      className={card}
      style={{ "--stack-i": index } as CSSProperties}
    >
      {content}
    </Reveal>
  );
}
