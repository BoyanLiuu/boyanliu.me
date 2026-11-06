import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookmarkRow } from "@/components/bookmarks/bookmark-row";
import { PostRow } from "@/components/blog/post-row";
import { ProjectRow } from "@/components/projects/project-row";
import {
  Container,
  Display,
  Section,
  Sections,
} from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { getBookmarks } from "@/lib/bookmarks";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { allTopics, itemsForTopic } from "@/lib/relations";
import { pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allTopics(getPosts(), getProjects(), getBookmarks()).map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Projects and writing about ${tag}.`,
    alternates: pageAlternates(`/tags/${tag}`),
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const { posts, projects } = itemsForTopic(tag, getPosts(), getProjects());
  const bookmarks = getBookmarks().filter((b) => b.tags.includes(tag));
  if (posts.length === 0 && projects.length === 0 && bookmarks.length === 0)
    notFound();

  return (
    <Container>
      <Display className="pt-10 lg:pt-14">
        <span className="text-accent">#</span>
        {tag}
      </Display>
      <Sections className="mt-6">
        {projects.length > 0 && (
          <Section title={siteConfig.ui.selectedWork}>
            {projects.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </Section>
        )}
        {posts.length > 0 && (
          <Section title={siteConfig.ui.writing}>
            {posts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </Section>
        )}
        {bookmarks.length > 0 && (
          <Section title={siteConfig.ui.bookmarks}>
            {bookmarks.map((bookmark) => (
              <BookmarkRow key={bookmark.url} bookmark={bookmark} />
            ))}
          </Section>
        )}
      </Sections>
    </Container>
  );
}
