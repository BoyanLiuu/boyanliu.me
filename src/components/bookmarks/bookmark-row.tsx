import Link from "next/link";
import { Label, Row } from "@/components/swiss/layout";
import { type Bookmark, hostOf } from "@/lib/bookmarks";
import { formatDate, isoDate } from "@/lib/date";

/** One bookmark: title (opens the site) and source · note · tags and date. No detail page. */
export const BookmarkRow = ({
  bookmark,
  compact = false,
}: {
  bookmark: Bookmark;
  compact?: boolean;
}) => (
  <Row className="items-baseline gap-y-2">
    <div className="col-span-4 md:col-span-3 lg:col-span-4">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display text-h3 font-bold underline decoration-1 underline-offset-4 hover:text-accent"
      >
        {bookmark.title} ↗
      </a>
      <Label className="mt-1 block text-muted">
        {bookmark.kind} · {hostOf(bookmark.url)}
      </Label>
    </div>
    <p className="col-span-4 text-body md:col-span-5 lg:col-span-6">
      {bookmark.note}
    </p>
    <div className="col-span-4 flex flex-wrap gap-x-3 text-small md:col-span-8 lg:col-span-2 lg:block lg:text-right">
      {!compact &&
        bookmark.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="inline-block min-w-6 py-0.5 hover:text-accent lg:block"
          >
            #{tag}
          </Link>
        ))}
      <Label className="block text-muted">
        <time dateTime={isoDate(bookmark.added)}>
          {formatDate(bookmark.added)}
        </time>
      </Label>
    </div>
  </Row>
);
