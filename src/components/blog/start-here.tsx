import Link from "next/link";
import { Label } from "@/components/swiss/layout";
import type { Post } from "@/lib/posts";

/** The best posts first: featured posts as a 3-column row above the archive. */
export const StartHere = ({ posts }: { posts: Post[] }) => {
  if (posts.length === 0) return null;
  return (
    <section
      aria-label="Start here"
      className="mt-10 border-t-2 border-rule pt-3"
    >
      <Label className="text-accent">Start here</Label>
      <div className="mt-3 grid gap-x-6 gap-y-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border-t border-rule pt-3"
          >
            <span className="block font-display text-h3 font-bold group-hover:text-accent">
              {post.title}
            </span>
            <span className="mt-1 block text-body text-muted">
              {post.summary}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
