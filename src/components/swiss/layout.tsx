import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page width and outer margins: 20 / 32 / 64px, content capped at 1312px. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[calc(1312px+8rem)] px-5 md:px-8 lg:px-16",
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

/** Horizontal rule: 1px between rows, 2px above sections. */
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

/** Small uppercase label. */
export function Label({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("text-label font-medium uppercase", className)}
      {...props}
    />
  );
}

/** The signature red square. Decorative only. */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "ml-[0.04em] inline-block size-[0.15em] bg-accent align-baseline",
        className,
      )}
    />
  );
}

/** The giant Swiss headline. */
export function Display({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-display text-display font-bold text-balance break-words",
        className,
      )}
      {...props}
    />
  );
}

/** Wraps numbered sections so their counters restart at 01. */
export function Sections({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("[counter-reset:section]", className)} {...props} />
  );
}

/**
 * A numbered section: the number (from a CSS counter) and title take columns 1–2,
 * the content columns 3–12. On phones the number sits above the content.
 */
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
      className={cn("pt-10 [counter-increment:section]", className)}
    >
      <Grid>
        <header className="col-span-4 mb-6 md:col-span-8 lg:col-span-2 lg:mb-0">
          <span
            aria-hidden
            className="block font-display text-[3rem] leading-[0.9] font-bold tracking-[-0.04em] before:content-[counter(section,decimal-leading-zero)] lg:text-[4rem]"
          />
          <h2 className="mt-2 text-small font-medium">{title}</h2>
        </header>
        <div className="col-span-4 md:col-span-8 lg:col-span-10">
          {children}
        </div>
      </Grid>
    </section>
  );
}

/** A table-like row with a 1px top rule. Pass column spans to the children. */
export function Row({ className, ...props }: ComponentProps<"div">) {
  return (
    <Grid className={cn("border-t border-rule py-5", className)} {...props} />
  );
}
