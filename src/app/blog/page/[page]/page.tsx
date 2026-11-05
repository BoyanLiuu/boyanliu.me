import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archive, POSTS_PER_PAGE } from "@/components/blog/archive";
import { Container, Display, Mark } from "@/components/swiss/layout";
import { paginate } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

/** Pages 2…N only; page 1 is /blog. Empty until there are more than POSTS_PER_PAGE posts. */
export function generateStaticParams() {
  const { pages } = paginate(getPosts(), 1, POSTS_PER_PAGE);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Writing — page ${page}`,
    alternates: pageAlternates(`/blog/page/${page}`),
  };
}

export default async function BlogPage({ params }: Props) {
  const { items, page, pages } = paginate(
    getPosts(),
    Number((await params).page),
    POSTS_PER_PAGE,
  );
  if (items.length === 0 || page === 1) notFound();
  return (
    <Container>
      <Display className="pt-10 lg:pt-14">
        Writing
        <Mark />
      </Display>
      <Archive posts={items} page={page} pages={pages} />
    </Container>
  );
}
