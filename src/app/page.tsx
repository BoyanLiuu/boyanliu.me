import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceRow } from "@/components/about/experience-row";
import { PostRow } from "@/components/blog/post-row";
import { Hero } from "@/components/home/hero";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFeature } from "@/components/projects/project-feature";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section, Sections } from "@/components/swiss/layout";
import { LinkBar } from "@/components/swiss/link-bar";
import { contactCells } from "@/config/links";
import { siteConfig } from "@/config/site";
import { experience } from "@/data/experience";
import { getPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { pageAlternates, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = { alternates: pageAlternates("/") };

export default function Home() {
  const [feature, ...rest] = getFeaturedProjects(3);
  const posts = getPosts().slice(0, 3);

  return (
    <Container>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <LinkBar cells={contactCells} label="Contact" className="border-t-0" />
      <Sections>
        <Section title={siteConfig.ui.selectedWork} id="work">
          {feature && <ProjectFeature project={feature} />}
          {rest.length > 0 && (
            <div className="mt-10 grid gap-x-6 gap-y-10 border-t border-rule pt-5 md:grid-cols-2">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
          <p className="mt-6 text-small">
            <Link
              href="/projects"
              className="underline underline-offset-4 hover:text-accent"
            >
              All work →
            </Link>
          </p>
        </Section>
        <Section title={siteConfig.ui.writing} id="writing">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
          <p className="mt-6 text-small">
            <Link
              href="/blog"
              className="underline underline-offset-4 hover:text-accent"
            >
              All writing →
            </Link>
          </p>
        </Section>
        <Section title={siteConfig.ui.experience} id="experience">
          {experience.slice(0, 3).map((role) => (
            <ExperienceRow key={`${role.company}-${role.start}`} role={role} />
          ))}
        </Section>
      </Sections>
    </Container>
  );
}
