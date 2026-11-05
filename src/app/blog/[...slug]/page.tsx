import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/mdx/markdown";
import { formatDate, isoDate } from "@/lib/date";
import { getPostBySlug, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string[] }> };

// Only prerendered posts exist; any other slug is a real 404 (not a streamed soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug.join("/"));
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    keywords: post.keywords ?? post.tags,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug.join("/"));
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Link href="/blog">← Writing</Link>
      <article>
        <h1 className="mt-6 font-display text-h1 font-bold">{post.title}</h1>
        <p>
          <time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time> ·{" "}
          {post.readingMinutes} min read
        </p>
        <Markdown code={post.mdx} className="mt-10" />
      </article>
    </main>
  );
}
