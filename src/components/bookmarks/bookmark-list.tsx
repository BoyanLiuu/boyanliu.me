"use client";

import { useRef, useState, type ReactNode } from "react";
import { Pager, pagerLinkClass } from "@/components/swiss/pager";
import { cn } from "@/lib/cn";
import { paginate } from "@/lib/content";

export const BOOKMARKS_PER_PAGE = 10;

type Row = { kind: string; key: string; node: ReactNode };

/**
 * Kind filter and pager for the bookmarks page. Rows are rendered on the server and passed in with their kind and
 * section; the filter applies first, then the pager, then rows are regrouped under their section headings.
 */
export function BookmarkFilter({
  kinds,
  sections,
  perPage = BOOKMARKS_PER_PAGE,
}: {
  kinds: { kind: string; count: number }[];
  sections: { title: string; rows: Row[] }[];
  perPage?: number;
}) {
  const [active, setActive] = useState<string>("all");
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);
  const total = kinds.reduce((sum, k) => sum + k.count, 0);
  const options = [{ kind: "all", count: total }, ...kinds];

  const matching = sections.flatMap((section) =>
    section.rows
      .filter((row) => active === "all" || row.kind === active)
      .map((row) => ({ section: section.title, row })),
  );
  const { items, pages } = paginate(matching, page, perPage);
  const titles = [...new Set(items.map((item) => item.section))];

  const goTo = (next: number) => {
    setPage(next);
    top.current?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <div
        ref={top}
        role="toolbar"
        aria-label="Filter bookmarks by kind"
        className="mt-8 flex scroll-mt-6 flex-wrap gap-x-5 gap-y-2 text-small"
      >
        {options.map(({ kind, count }) => (
          <button
            key={kind}
            type="button"
            aria-pressed={active === kind}
            onClick={() => {
              setActive(kind);
              setPage(1);
            }}
            className={cn(
              "capitalize hover:text-accent",
              active === kind &&
                "font-bold text-accent underline underline-offset-4",
            )}
          >
            {kind === "all" ? "All" : `${kind}s`}{" "}
            <span className="text-muted">{count}</span>
          </button>
        ))}
      </div>
      {titles.map((title) => (
        <section key={title} aria-label={title} className="mt-8">
          <h2 className="border-t-2 border-rule pt-3 text-label font-medium uppercase">
            {title}
          </h2>
          {items
            .filter((item) => item.section === title)
            .map(({ row }) => (
              <div key={row.key}>{row.node}</div>
            ))}
        </section>
      ))}
      <Pager
        page={page}
        pages={pages}
        newer={
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            className={pagerLinkClass}
          >
            ← Newer
          </button>
        }
        older={
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            className={pagerLinkClass}
          >
            Older →
          </button>
        }
      />
    </>
  );
}
