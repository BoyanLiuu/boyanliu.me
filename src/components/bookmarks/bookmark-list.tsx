"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Kind filter for the bookmarks page. Rows are rendered on the server and passed in with their kind;
 * without JavaScript every row stays visible.
 */
export function BookmarkFilter({
  kinds,
  sections,
}: {
  kinds: { kind: string; count: number }[];
  sections: {
    title: string;
    rows: { kind: string; key: string; node: ReactNode }[];
  }[];
}) {
  const [active, setActive] = useState<string>("all");
  const total = kinds.reduce((sum, k) => sum + k.count, 0);
  const options = [{ kind: "all", count: total }, ...kinds];

  return (
    <>
      <div
        role="toolbar"
        aria-label="Filter bookmarks by kind"
        className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-small"
      >
        {options.map(({ kind, count }) => (
          <button
            key={kind}
            type="button"
            aria-pressed={active === kind}
            onClick={() => setActive(kind)}
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
      {sections.map((section) => {
        const rows = section.rows.filter(
          (row) => active === "all" || row.kind === active,
        );
        if (rows.length === 0) return null;
        return (
          <section
            key={section.title}
            aria-label={section.title}
            className="mt-8"
          >
            <h2 className="border-t-2 border-rule pt-3 text-label font-medium uppercase">
              {section.title}
            </h2>
            {rows.map((row) => (
              <div key={row.key}>{row.node}</div>
            ))}
          </section>
        );
      })}
    </>
  );
}
