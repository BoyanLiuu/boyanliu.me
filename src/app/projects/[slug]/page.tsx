import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import { pageAlternates, pageOpenGraph } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/media/media-frame";
import { Markdown } from "@/components/mdx/markdown";
import { PostRow } from "@/components/blog/post-row";
import { Frame } from "@/components/swiss/frame";
import {
  Container,
  Display,
  Grid,
  Label,
  Mark,
} from "@/components/swiss/layout";
import { getPosts } from "@/lib/posts";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { postsForProject } from "@/lib/relations";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  return project
    ? {
        title: project.title,
        description: project.summary,
        alternates: pageAlternates(`/projects/${project.slug}`),
        openGraph: pageOpenGraph({
          type: "article",
          url: `/projects/${project.slug}`,
          title: project.title,
          description: project.summary,
        }),
      }
    : {};
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-rule pt-3 pb-5">
      <Label className="block text-muted">{label}</Label>
      <div className="mt-1.5 text-body">{children}</div>
    </div>
  );
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const projects = getProjects();
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const index = projects.findIndex((p) => p.slug === slug);
  const links = Object.entries(project.links).filter(([, href]) => href);
  const related = postsForProject(getPosts(), project.slug);

  return (
    <Container>
      <div className="flex justify-between border-b border-rule py-3.5 text-small">
        <Link href="/projects" className="hover:text-accent">
          ← Work
        </Link>
        <span>
          Project {String(index + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <Grid className="border-b border-rule pt-10 pb-8">
        <Display className="col-span-4 md:col-span-8 lg:col-span-9">
          {project.title}
          <Mark />
        </Display>
        <div className="col-span-4 mt-6 self-end text-body md:col-span-6 lg:col-span-3 lg:mt-0">
          <p className="flex items-center gap-2 font-bold">
            <span
              aria-hidden
              className="inline-block size-2.5 rounded-full bg-accent"
            />
            {project.status === "live"
              ? "Live"
              : project.status === "in-progress"
                ? "In progress"
                : "Archived"}
          </p>
          <p className="mt-3">{project.summary}</p>
        </div>
      </Grid>

      <Grid className="mt-6">
        <aside className="col-span-4 grid grid-cols-2 gap-x-4 md:col-span-8 md:grid-cols-4 lg:col-span-3 lg:block">
          <div className="contents lg:sticky lg:top-6 lg:block">
            <Fact label="Role">{project.role}</Fact>
            <Fact label="Year">{project.year}</Fact>
            <Fact label="Stack">{project.stack.join(" · ")}</Fact>
            <Fact label="Result">
              <span className="font-display text-h2 font-bold text-accent">
                {project.outcome}
              </span>
            </Fact>
            {links.length > 0 && (
              <Fact label="Links">
                {links.map(([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    className="block capitalize underline underline-offset-4 hover:text-accent"
                  >
                    {name} ↗
                  </a>
                ))}
              </Fact>
            )}
          </div>
        </aside>

        <div className="col-span-4 md:col-span-8 lg:col-span-9">
          <div className="grid gap-6 border-t-2 border-rule pt-3 md:grid-cols-3">
            {[
              ["Problem", project.problem],
              ["What I did", project.approach],
              ["Result", project.result],
            ].map(([label, text]) => (
              <div key={label}>
                <Label
                  className={label === "Result" ? "text-accent" : undefined}
                >
                  {label}
                </Label>
                <p className="mt-2 text-body">{text}</p>
              </div>
            ))}
          </div>
          <figure className="mt-8">
            <Frame src={project.cover} alt={project.coverAlt} priority />
            <figcaption className="mt-2">
              <Label>Fig. 1 — {project.title} overview</Label>
            </figcaption>
          </figure>
          <Markdown code={project.mdx} className="mt-10 max-w-[68ch]" />
          {project.media.length > 0 && (
            <div className="mt-12 grid gap-8 border-t-2 border-rule pt-6 md:grid-cols-2">
              {project.media.map((item) => (
                <MediaFrame
                  key={item.src}
                  item={item}
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              ))}
            </div>
          )}
          {related.length > 0 && (
            <section aria-label="Related writing" className="mt-12">
              <h2 className="border-t border-rule pt-4 text-small font-semibold text-muted">
                Related writing
              </h2>
              {related.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
            </section>
          )}
        </div>
      </Grid>
    </Container>
  );
}
