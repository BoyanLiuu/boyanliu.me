import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { FooterReveal } from "@/components/motion/footer-reveal";
import {
  type HandImages,
  ReachingHands,
} from "@/components/motion/reaching-hands";
import { Container } from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { currentVersion } from "@/data/changelog";
import { ContactLinks } from "./contact-links";

/**
 * Hand artwork for the footer card: public/hands/left.(png|webp|svg) and right.(…), checked at
 * build time. Without both files the card uses its built-in line-art SVG.
 */
const findHandImages = (): HandImages | undefined => {
  const find = (side: "left" | "right") =>
    ["png", "webp", "svg"]
      .map((extension) => `${side}.${extension}`)
      .find((file) =>
        existsSync(path.join(process.cwd(), "public", "hands", file)),
      );
  const left = find("left");
  const right = find("right");
  return left && right
    ? { left: `/hands/${left}`, right: `/hands/${right}` }
    : undefined;
};

/**
 * Dark closing panel under the page sheet: the reaching-hands card, call to action, contact pills
 * and the small print. The first three enter in sequence when the footer scrolls into view.
 */
export const Footer = () => {
  // Rendered at build time; the range updates on the next deploy each year.
  const start = siteConfig.author.copyrightStart;
  const year = new Date().getFullYear();
  const copyright = year > start ? `${start}–${year}` : String(start);
  const {
    footerTitle = "Thanks for stopping by.",
    footerSubtitle = "Let’s talk.",
  } = siteConfig.ui;
  return (
    <footer className="bg-night text-night-ink print:hidden">
      <Container className="flex flex-col items-center pt-20 pb-10 text-center lg:pt-24">
        <FooterReveal className="flex w-full flex-col items-center">
          <ReachingHands className="footer-art" images={findHandImages()} />
          <p className="footer-line mt-12 font-display text-[clamp(1.6rem,3vw,1.9rem)] leading-[1.35] text-balance">
            {footerTitle}
            <br />
            {footerSubtitle}
          </p>
          <ContactLinks
            label="Contact (footer)"
            tone="night"
            className="footer-actions mt-8 justify-center"
          />
        </FooterReveal>
        <div className="mt-20 flex w-full flex-wrap justify-between gap-x-6 gap-y-2 border-t border-night-rule pt-6 text-small text-night-muted">
          <span>
            © {copyright} {siteConfig.author.name}. Code MIT · content all
            rights reserved.
            {siteConfig.features.analytics &&
              " Cookie-free analytics by Plausible."}
          </span>
          <span className="flex gap-5">
            <a href="/rss.xml" className="hover:text-night-ink">
              RSS
            </a>
            <Link href="/changelog" className="group hover:text-night-ink">
              Changelog{" "}
              <span className="rounded-full border border-night-rule px-2 py-0.5 font-mono text-label transition-colors group-hover:border-night-ink">
                v{currentVersion}
              </span>
            </Link>
            <a href="#top" className="hover:text-night-ink">
              Back to top ↑
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
};
