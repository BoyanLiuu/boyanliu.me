import type { Metadata } from "next";
import { Archive, POSTS_PER_PAGE } from "@/components/blog/archive";
import { StartHere } from "@/components/blog/start-here";
import { Container, Display, Mark } from "@/components/swiss/layout";
import { paginate } from "@/lib/content";
import { getFeaturedPosts, getPosts } from "@/lib/posts";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Posts on building software: case studies, debugging stories and design trade-offs.",
  alternates: pageAlternates("/blog"),
};

export default function BlogIndex() {
  const { items, page, pages } = paginate(getPosts(), 1, POSTS_PER_PAGE);
  return (
    <Container>
      <Display className="pt-10 lg:pt-14">
        Writing
        <Mark />
      </Display>
      <StartHere posts={getFeaturedPosts(3)} />
      <Archive posts={items} page={page} pages={pages} />
    </Container>
  );
}
