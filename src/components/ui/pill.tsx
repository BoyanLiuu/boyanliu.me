import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { eventAttrs } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const sizes = { sm: "pill-sm", md: "", lg: "pill-lg" } as const;
const tones = { accent: "", ink: "pill-ink" } as const;

type PillLook = {
  icon?: ReactNode;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
};

/** The label and the circle the icon slides out of, shared by the link and the button. */
const PillBody = ({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) => (
  <>
    <span className="pill__inner">{children}</span>
    <span aria-hidden className="pill__circle">
      <span>{icon}</span>
    </span>
  </>
);

/**
 * Filled pill link. On hover or keyboard focus the label shrinks and a circle with the icon
 * slides in on its right. Styles: `.pill` in globals.css.
 */
export const Pill = ({
  href,
  children,
  icon = <ArrowRightIcon size={18} weight="bold" />,
  tone = "accent",
  size = "md",
  className,
  title,
  event,
}: PillLook & {
  href: string;
  children: ReactNode;
  title?: string;
  /** Custom event sent on click (when analytics.customEvents is on). */
  event?: string;
}) => {
  const classes = cn("pill", sizes[size], tones[tone], className);
  const content = <PillBody icon={icon}>{children}</PillBody>;
  // Pages navigate in place; files such as /resume.pdf and external URLs open in a new tab.
  const isFile = /\.[a-z0-9]{2,4}$/i.test(href);
  if (href.startsWith("/") && !isFile) {
    return (
      <Link
        href={href}
        className={classes}
        title={title}
        {...eventAttrs(event)}
      >
        {content}
      </Link>
    );
  }
  const newTab = isFile || /^https?:/.test(href);
  return (
    <a
      href={href}
      className={classes}
      title={title}
      {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      {...eventAttrs(event)}
    >
      {content}
    </a>
  );
};

/**
 * Filled pill that submits the form it sits in, with the same slide-in icon as <Pill>.
 * While `pending` the circle stays open and the button is disabled.
 */
export const PillButton = ({
  children,
  icon = <ArrowRightIcon size={18} weight="bold" />,
  tone = "accent",
  size = "md",
  className,
  pending = false,
}: PillLook & { children: ReactNode; pending?: boolean }) => (
  <button
    type="submit"
    aria-busy={pending}
    disabled={pending}
    className={cn(
      "pill cursor-pointer disabled:cursor-not-allowed",
      sizes[size],
      tones[tone],
      className,
    )}
  >
    <PillBody icon={icon}>{children}</PillBody>
  </button>
);
