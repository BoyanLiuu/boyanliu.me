import type { ReactNode } from "react";
import { Label } from "./layout";

export const pagerLinkClass = "underline underline-offset-4 hover:text-accent";

/**
 * "← Newer · Page x of y · Older →" bar shared by the writing archive (links) and bookmarks (buttons).
 * Pass the controls already built; hidden when there is a single page.
 */
export function Pager({
  page,
  pages,
  newer,
  older,
}: {
  page: number;
  pages: number;
  newer: ReactNode;
  older: ReactNode;
}) {
  if (pages <= 1) return null;
  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-baseline justify-between border-t-2 border-rule pt-4 text-small"
    >
      {page > 1 ? newer : <span />}
      <Label aria-live="polite">
        Page {page} of {pages}
      </Label>
      {page < pages ? older : <span />}
    </nav>
  );
}
