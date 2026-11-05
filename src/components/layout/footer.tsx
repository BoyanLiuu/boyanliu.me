import { Container } from "@/components/swiss/layout";
import { LinkBar } from "@/components/swiss/link-bar";
import { contactCells } from "@/config/links";
import { siteConfig } from "@/config/site";

/** Contact link bar and the small print. */
export function Footer() {
  // Rendered at build time; the range updates on the next deploy each year.
  const start = siteConfig.author.copyrightStart;
  const year = new Date().getFullYear();
  const copyright = year > start ? `${start}–${year}` : String(start);
  return (
    <footer className="mt-24 pb-10 print:hidden">
      <Container>
        <LinkBar cells={contactCells} label="Contact" />
        <div className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 text-small text-muted">
          <span>
            © {copyright} {siteConfig.author.name}. Code MIT · content all
            rights reserved.
            {siteConfig.features.analytics &&
              " Cookie-free analytics by Plausible."}
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
