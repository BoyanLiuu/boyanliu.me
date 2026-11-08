import Link from "next/link";
import { Label, Row } from "@/components/swiss/layout";
import { cn } from "@/lib/cn";
import { formatDate, isoDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

/**
 * Writing row: title · summary · reading time and date.
 * Tablets: title and date share the first line, the summary takes the full second line.
 * `wide` gives the title more room (blog index).
 */
export const PostRow = ({
  post,
  wide = false,
}: {
  post: Post;
  wide?: boolean;
}) => (
  <Row className="items-baseline gap-y-1">
    <h3
      className={cn(
        "col-span-4 md:col-span-5",
        wide ? "lg:col-span-6" : "lg:col-span-5",
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="font-display text-h3 font-bold hover:text-accent"
      >
        {post.title}
      </Link>
    </h3>
    <p
      className={cn(
        "col-span-4 text-body text-muted md:order-last md:col-span-8 lg:order-none",
        wide ? "lg:col-span-4" : "lg:col-span-5",
      )}
    >
      {post.summary}
    </p>
    <Label className="col-span-4 md:col-span-3 md:text-right lg:col-span-2">
      {post.readingMinutes} min ·{" "}
      <time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time>
    </Label>
  </Row>
);
