import Link from "next/link";
import { Container } from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const lgCols: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

type Cell = { label: string; detail?: string; href: string };

/** Contact link bar (Résumé · Email · LinkedIn · GitHub) and the small print. */
export function Footer() {
  const cells: Cell[] = [
    { label: `${siteConfig.ui.resume} ↓`, href: "/resume" },
    {
      label: "Email",
      detail: siteConfig.author.email,
      href: `mailto:${siteConfig.author.email}`,
    },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "GitHub", href: siteConfig.social.github },
  ].filter((cell) => cell.href);

  return (
    <footer className="mt-24 pb-10">
      <Container>
        <nav
          aria-label="Contact"
          className={cn(
            "grid grid-cols-2 gap-px border-y border-rule bg-rule",
            lgCols[cells.length],
          )}
        >
          {cells.map((cell, index) => {
            // An odd last cell spans both columns on phones, so no empty gap shows.
            const spanLast =
              index === cells.length - 1 &&
              cells.length % 2 === 1 &&
              "col-span-2 lg:col-span-1";
            const base = "p-4 font-display text-h3 font-bold lg:p-5";

            if (cell.href.startsWith("/")) {
              return (
                <Link
                  key={cell.label}
                  href={cell.href}
                  className={cn(base, "bg-accent text-paper", spanLast)}
                >
                  {cell.label}
                </Link>
              );
            }
            return (
              <a
                key={cell.label}
                href={cell.href}
                className={cn(
                  base,
                  "truncate bg-paper hover:text-accent",
                  spanLast,
                )}
              >
                {cell.detail ? (
                  <>
                    <span className="lg:hidden">{cell.label}</span>
                    <span className="hidden lg:inline">{cell.detail}</span>
                  </>
                ) : (
                  cell.label
                )}
              </a>
            );
          })}
        </nav>
        <div className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 text-small text-muted">
          <span>
            © 2026 {siteConfig.author.name}. Code MIT · content all rights
            reserved.
          </span>
          <span className="flex gap-4">
            <a
              href="/rss.xml"
              className="underline underline-offset-4 hover:text-accent"
            >
              RSS
            </a>
            <a
              href="#top"
              className="underline underline-offset-4 hover:text-accent"
            >
              Back to top ↑
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
