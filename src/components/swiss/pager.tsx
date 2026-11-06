import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { pageNumbers } from "@/lib/content";

/** Renders one pager control: a link (writing archive) or a button (bookmarks). */
export type PagerControl = (
  target: number,
  props: { className: string; "aria-label": string; children: ReactNode },
) => ReactNode;

/**
 * "← Previous  1 2 3  Next →" bar shared by the writing archive and bookmarks. Hidden when there is a single page.
 * The current page is plain text marked with the accent square.
 */
export function Pager({
  page,
  pages,
  control,
}: {
  page: number;
  pages: number;
  control: PagerControl;
}) {
  if (pages <= 1) return null;
  const link = "underline underline-offset-4 hover:text-accent";
  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-baseline justify-between gap-4 border-t-2 border-rule pt-4 text-small"
    >
      <span className="min-w-20">
        {page > 1 &&
          control(page - 1, {
            className: link,
            "aria-label": "Previous page",
            children: "← Previous",
          })}
      </span>
      <ol className="flex items-baseline gap-1 tabular-nums">
        {pageNumbers(page, pages).map((n, i) => (
          <li key={n === "…" ? `gap-${i}` : n}>
            {n === "…" ? (
              <span aria-hidden className="px-2 text-muted">
                …
              </span>
            ) : n === page ? (
              <span
                aria-current="page"
                className="flex items-center gap-1 px-2 py-1 font-bold"
              >
                <span aria-hidden className="inline-block size-2 bg-accent" />
                {n}
              </span>
            ) : (
              control(n, {
                className: cn(link, "inline-block px-2 py-1"),
                "aria-label": `Page ${n}`,
                children: n,
              })
            )}
          </li>
        ))}
      </ol>
      <span className="min-w-20 text-right">
        {page < pages &&
          control(page + 1, {
            className: link,
            "aria-label": "Next page",
            children: "Next →",
          })}
      </span>
    </nav>
  );
}
