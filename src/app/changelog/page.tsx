import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Container, Display, Mark } from "@/components/swiss/layout";
import { changelog } from "@/data/changelog";
import { cn } from "@/lib/cn";
import { formatDate, isoDate } from "@/lib/date";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "A version history of this site: every redesign, new section and notable feature.",
  alternates: pageAlternates("/changelog"),
};

export default function Changelog() {
  return (
    <Container>
      <div className="grid gap-8 pt-10 lg:grid-cols-12 lg:items-end lg:pt-14">
        <Display className="enter-up lg:col-span-6">
          Changelog
          <Mark />
        </Display>
        <p className="enter-up text-lead text-muted [animation-delay:150ms] lg:col-span-6 lg:pb-3">
          A version history of this corner of the internet: every redesign, new
          section and feature worth mentioning since the first commit.
        </p>
      </div>
      <Reveal as="ul" variant="stagger" className="mt-14 lg:mt-20">
        {changelog.map((entry, index) => (
          <li
            key={entry.version}
            className="grid gap-x-6 gap-y-4 border-t border-rule py-10 lg:grid-cols-12"
          >
            <div className="flex items-center gap-3 lg:col-span-4 lg:flex-col lg:items-start lg:gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-label font-semibold",
                  index === 0 ? "bg-ink text-paper" : "bg-wash text-muted",
                )}
              >
                v{entry.version}
              </span>
              <time
                dateTime={isoDate(entry.date)}
                className="text-small text-muted"
              >
                {formatDate(entry.date)}
              </time>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-display text-h3 font-bold">
                {entry.emoji && (
                  <span aria-hidden className="mr-2">
                    {entry.emoji}
                  </span>
                )}
                {entry.title}
              </h2>
              <p className="mt-3 max-w-[62ch] text-body text-muted">
                {entry.summary}
              </p>
            </div>
          </li>
        ))}
      </Reveal>
    </Container>
  );
}
