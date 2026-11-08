import type { Metadata } from "next";
import { ExperienceRow } from "@/components/about/experience-row";
import { BookmarkRow } from "@/components/bookmarks/bookmark-row";
import { PostRow } from "@/components/blog/post-row";
import { Hero } from "@/components/home/hero";
import { Reveal } from "@/components/motion/reveal";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Container,
  MoreLink,
  Section,
  Sections,
} from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { experience } from "@/data/experience";
import { getBookmarks } from "@/lib/bookmarks";
import { getPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { pageAlternates, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = { alternates: pageAlternates("/") };

export default function Home() {
  const projects = getFeaturedProjects(3);
  const posts = getPosts().slice(0, 3);
  const bookmarks = getBookmarks().slice(0, 3);

  return (
    <Container>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <Sections>
        <Section
          title={siteConfig.ui.selectedWork}
          id="work"
          className="pt-10 lg:pt-14"
        >
          <div className="grid gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                first={index === 0}
              />
            ))}
          </div>
          <MoreLink href="/projects">All work →</MoreLink>
        </Section>
        <Section title={siteConfig.ui.writing} id="writing">
          <Reveal variant="stagger">
            {posts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </Reveal>
          <MoreLink href="/blog">All writing →</MoreLink>
        </Section>
        <Section title={siteConfig.ui.experience} id="experience">
          <Reveal variant="stagger">
            {experience.slice(0, 3).map((role) => (
              <ExperienceRow
                key={`${role.company}-${role.start}`}
                role={role}
              />
            ))}
          </Reveal>
        </Section>
        {bookmarks.length > 0 && (
          <Section title={siteConfig.ui.bookmarks} id="bookmarks">
            <Reveal variant="stagger">
              {bookmarks.map((bookmark) => (
                <BookmarkRow key={bookmark.url} bookmark={bookmark} compact />
              ))}
            </Reveal>
            <MoreLink href="/bookmarks">All bookmarks →</MoreLink>
          </Section>
        )}
      </Sections>
    </Container>
  );
}
