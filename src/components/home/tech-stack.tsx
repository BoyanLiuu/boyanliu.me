import type { CSSProperties } from "react";
import * as simpleIcons from "simple-icons";
import { siteConfig } from "@/config/site";

type BrandIcon = { slug: string; title: string; hex: string; path: string };

/** Every simple-icons logo by slug. Server-only: the logos' paths are inlined into the HTML. */
const bySlug = new Map(
  Object.values(simpleIcons as Record<string, BrandIcon>)
    .filter((icon) => typeof icon === "object" && "slug" in icon)
    .map((icon) => [icon.slug, icon]),
);

/** Near-black brand colours (e.g. Next.js) would vanish in dark mode, so they follow the text colour. */
const isNearBlack = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! < 40;
};

/**
 * "My stack" row under the hero: overlapping round logo badges.
 * Motion: the label rises in at 0.5s, then the badges pop in 70ms apart; hovering one lifts and tilts it.
 * Each badge shows its name in a tooltip below it on hover, tap or keyboard focus.
 */
export const TechStack = ({ className }: { className?: string }) => {
  const slugs = siteConfig.author.stack ?? [];
  if (slugs.length === 0) return null;
  const icons = slugs.map((slug) => {
    const icon = bySlug.get(slug);
    if (!icon)
      throw new Error(
        `content/site.json author.stack: unknown icon "${slug}". Use a slug from https://simpleicons.org (e.g. "nextdotjs").`,
      );
    return icon;
  });
  const label = siteConfig.ui.stack ?? "My stack";
  return (
    <div className={className}>
      <p className="enter-up text-[1.25rem] leading-tight font-semibold tracking-[-0.01em] text-ink/70 [animation-delay:500ms]">
        {label}
      </p>
      <ul aria-label={label} className="mt-3.5 flex flex-wrap">
        {icons.map((icon, index) => (
          <li
            key={icon.slug}
            className="stack-icon"
            tabIndex={0}
            style={{ "--i": index } as CSSProperties}
          >
            <span aria-hidden className="stack-tip">
              {icon.title}
            </span>
            <svg
              role="img"
              aria-label={icon.title}
              viewBox="0 0 24 24"
              fill={isNearBlack(icon.hex) ? "currentColor" : `#${icon.hex}`}
            >
              <path d={icon.path} />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};
