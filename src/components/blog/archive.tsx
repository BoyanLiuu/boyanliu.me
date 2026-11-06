import Link from "next/link";
import { Pager, pagerLinkClass } from "@/components/swiss/pager";
import type { Post } from "@/lib/posts";
import { PostRow } from "./post-row";

export const POSTS_PER_PAGE = 10;

const pageHref = (page: number) =>
  page === 1 ? "/blog" : `/blog/page/${page}`;

/** Posts grouped by year (year in columns 1–2), with a pager when there is more than one page. */
export function Archive({
  posts,
  page,
  pages,
}: {
  posts: Post[];
  page: number;
  pages: number;
}) {
  const years = [
    ...new Set(posts.map((post) => new Date(post.date).getUTCFullYear())),
  ];
  return (
    <div className="mt-10">
      {years.map((year) => (
        <section
          key={year}
          aria-label={String(year)}
          className="grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12"
        >
          <h2 className="col-span-4 border-t-2 border-rule pt-5 font-display text-h2 font-bold md:col-span-8 lg:col-span-2 lg:border-t-0">
            {year}
          </h2>
          <div className="col-span-4 md:col-span-8 lg:col-span-10">
            {posts
              .filter((post) => new Date(post.date).getUTCFullYear() === year)
              .map((post) => (
                <PostRow key={post.slug} post={post} wide />
              ))}
          </div>
        </section>
      ))}
      <Pager
        page={page}
        pages={pages}
        newer={
          <Link href={pageHref(page - 1)} className={pagerLinkClass}>
            ← Newer
          </Link>
        }
        older={
          <Link href={pageHref(page + 1)} className={pagerLinkClass}>
            Older →
          </Link>
        }
      />
    </div>
  );
}
