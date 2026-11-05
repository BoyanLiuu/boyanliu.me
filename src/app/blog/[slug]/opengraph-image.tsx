import { formatDate } from "@/lib/date";
import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getPostBySlug, getPosts } from "@/lib/posts";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Post cover";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPostBySlug((await params).slug);
  return ogImage({
    kicker: "Writing",
    title: post?.title ?? "Writing",
    footer: post
      ? `${formatDate(post.date)} · ${post.readingMinutes} min read`
      : undefined,
  });
}
