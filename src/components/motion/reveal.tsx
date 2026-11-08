"use client";

import { type ComponentProps, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  /** Fade and rise as one block. */
  fade: "reveal",
  /** Rise, scale up from 96% and settle the `.card-art` inside. */
  card: "reveal reveal--card",
  /** Direct children rise one after another. */
  stagger: "reveal-stagger",
} as const;

/**
 * Scroll reveal. Sets `data-revealed` once the element is 12% inside the viewport, then stops watching.
 * The attribute is written to the DOM directly, so React re-renders never reset it.
 * Reduced motion and no-JS are handled in CSS (globals.css and the layout's <noscript> rule).
 */
export function Reveal({
  as = "div",
  variant = "fade",
  className,
  ...props
}: {
  as?: "div" | "article" | "section" | "ul";
  variant?: keyof typeof variants;
} & ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.setAttribute("data-revealed", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  // One element type for typing; the rendered tag is still `as`.
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={cn(variants[variant], className)} {...props} />
  );
}
