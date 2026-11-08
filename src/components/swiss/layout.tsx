import Link from "next/link";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page width and outer margins: 20 / 32px, content capped at 72rem (1152px). */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[calc(72rem+4rem)] px-5 md:px-8",
        className,
      )}
      {...props}
    />
  );
}

/** The Swiss grid: 4 columns on phones, 8 on tablets, 12 from 1024px. */
export function Grid<T extends ElementType = "div">({
  as,
  className,
  ...props
}: { as?: T } & Omit<ComponentProps<T>, "as">) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        "grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12",
        className,
      )}
      {...props}
    />
  );
}

/** Horizontal rule: 1px between rows, 2px above groups. */
export function Rule({
  weight = 1,
  className,
}: {
  weight?: 1 | 2;
  className?: string;
}) {
  return (
    <hr
      className={cn(
        "border-0 border-rule",
        weight === 2 ? "border-t-2" : "border-t",
        className,
      )}
    />
  );
}

/** Small meta label (dates, stacks, captions). */
export function Label({ className, ...props }: ComponentProps<"span">) {
  return (
    <span className={cn("text-label font-medium", className)} {...props} />
  );
}

/** The accent full stop after headlines. Decorative only. */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "ml-[0.05em] inline-block size-[0.16em] rounded-full bg-accent align-baseline",
        className,
      )}
    />
  );
}

/** The page headline. */
export function Display({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-display text-display font-semibold text-balance break-words",
        className,
      )}
      {...props}
    />
  );
}

/** Groups page sections (kept as a wrapper so pages can add spacing). */
export function Sections({ className, ...props }: ComponentProps<"div">) {
  return <div className={className} {...props} />;
}

/** A page section: large display title, content underneath. */
export function Section({
  title,
  id,
  children,
  className,
}: {
  title: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={title}
      className={cn("scroll-mt-24 pt-16 lg:pt-24", className)}
    >
      <h2 className="font-display text-section font-bold">{title}</h2>
      <div className="mt-8 lg:mt-10">{children}</div>
    </section>
  );
}

/** "All work →" style link under a section: an outlined pill. */
export function MoreLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-8", className)}>
      <Link
        href={href}
        className="inline-flex items-center rounded-full border border-rule px-5 py-2.5 text-small font-semibold transition-colors hover:border-ink hover:bg-wash"
      >
        {children}
      </Link>
    </p>
  );
}

/** A table-like row with a 1px top rule. Pass column spans to the children. */
export function Row({ className, ...props }: ComponentProps<"div">) {
  return (
    <Grid className={cn("border-t border-rule py-5", className)} {...props} />
  );
}
