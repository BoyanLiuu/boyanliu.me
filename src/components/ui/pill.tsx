import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizes = { sm: "pill-sm", md: "", lg: "pill-lg" } as const;
const tones = { accent: "", ink: "pill-ink" } as const;

/**
 * Filled pill link. On hover or keyboard focus the label shrinks and a circle with the icon
 * slides in on its right. Styles: `.pill` in globals.css.
 */
export function Pill({
  href,
  children,
  icon = <ArrowRightIcon size={18} weight="bold" />,
  tone = "accent",
  size = "md",
  className,
  title,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
  title?: string;
}) {
  const classes = cn("pill", sizes[size], tones[tone], className);
  const content = (
    <>
      <span className="pill__inner">{children}</span>
      <span aria-hidden className="pill__circle">
        <span>{icon}</span>
      </span>
    </>
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} title={title}>
        {content}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={classes}
      title={title}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  );
}
