import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, isoDate } from "@/lib/date";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Posts on building software: case studies, debugging stories and design trade-offs.",
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1>Writing</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>{" "}
            <time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time> ·{" "}
            {post.readingMinutes} min
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
