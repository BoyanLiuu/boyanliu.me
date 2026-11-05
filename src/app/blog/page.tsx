import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { PostRow } from "@/components/blog/post-row";
import { Container, Display, Label, Mark } from "@/components/swiss/layout";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  alternates: pageAlternates("/blog"),
  title: "Writing",
  description:
    "Posts on building software: case studies, debugging stories and design trade-offs.",
};

export default function BlogIndex() {
  const posts = getPosts();
  const years = [
    ...new Set(posts.map((post) => new Date(post.date).getUTCFullYear())),
  ];

  return (
    <Container>
      <Display className="pt-10 lg:pt-14">
        Writing
        <Mark />
      </Display>
      <div className="mt-10">
        {years.map((year) => (
          <section
            key={year}
            aria-label={String(year)}
            className="grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12"
          >
            <Label className="col-span-4 border-t-2 border-rule pt-5 font-display text-h2! font-bold tracking-[-0.03em] normal-case md:col-span-8 lg:col-span-2 lg:border-t-0">
              {year}
            </Label>
            <div className="col-span-4 md:col-span-8 lg:col-span-10">
              {posts
                .filter((post) => new Date(post.date).getUTCFullYear() === year)
                .map((post) => (
                  <PostRow key={post.slug} post={post} wide />
                ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
