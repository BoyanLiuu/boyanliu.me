import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Toc } from "@/components/blog/toc";
import { Markdown } from "@/components/mdx/markdown";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Grid, Label, Mark } from "@/components/swiss/layout";
import { formatDate, isoDate } from "@/lib/date";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { blogPostingJsonLd, pageAlternates, pageOpenGraph } from "@/lib/seo";

type Props = { params: Promise<{ slug: string[] }> };

// Only prerendered posts exist; any other slug is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug.join("/"));
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    keywords: post.keywords ?? post.tags,
    alternates: pageAlternates(url),
    openGraph: pageOpenGraph({
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    }),
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug.join("/"));
  if (!post) notFound();

  return (
    <Container>
      <JsonLd data={blogPostingJsonLd(post)} />
      <div className="flex justify-between border-b border-rule py-3.5 text-small">
        <Link href="/blog" className="hover:text-accent">
          ← Writing
        </Link>
        <span>
          <time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time> ·{" "}
          {post.readingMinutes} min read
        </span>
      </div>
      <Grid>
        <h1 className="col-span-4 mt-10 font-display text-h1 font-bold text-balance md:col-span-8 lg:col-span-10 lg:mt-12 lg:text-[4rem] lg:leading-none">
          {post.title}
          <Mark />
        </h1>
        <p className="col-span-4 mt-5 text-h3 font-normal text-muted md:col-span-8 lg:col-span-8">
          {post.summary}
        </p>
      </Grid>

      <Grid className="mt-10 lg:mt-12">
        <aside className="col-span-4 mb-6 flex flex-wrap gap-x-6 gap-y-4 md:col-span-8 lg:col-span-2 lg:mb-0 lg:block lg:space-y-6">
          {post.tags.length > 0 && (
            <div>
              <Label className="block text-muted">Tags</Label>
              <ul className="mt-1 flex flex-wrap gap-x-3 text-small lg:block">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/tags/${tag}`}
                      className="underline underline-offset-4 hover:text-accent"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-3 xl:col-span-7">
          {post.toc.length > 0 && (
            <details className="mb-8 border-y border-rule xl:hidden">
              <summary className="flex cursor-pointer justify-between py-3 text-small font-bold">
                Contents{" "}
                <span>
                  {post.toc.filter((t) => t.depth === 2).length} sections ▾
                </span>
              </summary>
              <Toc items={post.toc} className="pb-3" />
            </details>
          )}
          <Markdown code={post.mdx} />
        </div>

        {post.toc.length > 0 && (
          <aside className="hidden xl:col-span-3 xl:col-start-10 xl:block">
            <div className="sticky top-6">
              <Label className="block border-t-2 border-rule pt-2.5">
                Contents
              </Label>
              <Toc items={post.toc} className="mt-2" />
            </div>
          </aside>
        )}
      </Grid>

      <div className="mt-16 border-t-2 border-rule pt-4 text-small">
        <Link
          href="/blog"
          className="underline underline-offset-4 hover:text-accent"
        >
          ← All writing
        </Link>
      </div>
    </Container>
  );
}
