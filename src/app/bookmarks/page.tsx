import type { Metadata } from "next";
import { BookmarkFilter } from "@/components/bookmarks/bookmark-list";
import { BookmarkRow } from "@/components/bookmarks/bookmark-row";
import { Container, Display, Grid, Mark } from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { getBookmarks, getFavoriteBookmarks } from "@/lib/bookmarks";
import { countValues } from "@/lib/content";
import { formatMonthYearLong } from "@/lib/date";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteConfig.ui.bookmarks,
  description:
    "Useful repos, blogs, articles and sites, each with a note on why.",
  alternates: pageAlternates("/bookmarks"),
};

export default function BookmarksPage() {
  const all = getBookmarks();
  const favorites = getFavoriteBookmarks();
  const kinds = countValues(all, (b) => [b.kind]).map(([kind, count]) => ({
    kind,
    count,
  }));
  // Favourites are pinned at the top, so the monthly sections list everything else.
  const rest = all.filter((b) => !b.favorite);
  const months = [...new Set(rest.map((b) => formatMonthYearLong(b.added)))];
  const toRow = (b: (typeof all)[number]) => ({
    kind: b.kind,
    key: b.url,
    node: <BookmarkRow bookmark={b} />,
  });

  return (
    <Container>
      <Grid className="items-end pt-10 lg:pt-14">
        <Display className="col-span-4 md:col-span-8 lg:col-span-8">
          {siteConfig.ui.bookmarks}
          <Mark />
        </Display>
        <p className="col-span-4 mt-6 text-body md:col-span-6 lg:col-span-4 lg:mt-0">
          Repos, blogs, articles and sites I&apos;ve found useful, each with a
          note on why.{" "}
          <span className="text-muted">{all.length} bookmarks.</span>
        </p>
      </Grid>
      <BookmarkFilter
        kinds={kinds}
        sections={[
          { title: "Favourites", rows: favorites.map(toRow) },
          ...months.map((month) => ({
            title: month,
            rows: rest
              .filter((b) => formatMonthYearLong(b.added) === month)
              .map(toRow),
          })),
        ]}
      />
    </Container>
  );
}
