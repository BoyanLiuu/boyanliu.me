"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * Footer entrance. Hides `.footer-avatar`, `.footer-line` and `.footer-actions` on mount
 * (`data-reveal="out"`) and plays their entrance once 35% of the footer is visible.
 * Without JS (or with reduced motion) the attribute is never set, so nothing is hidden.
 */
export function FooterReveal({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    element.dataset.reveal = "out";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.dataset.reveal = "in";
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
