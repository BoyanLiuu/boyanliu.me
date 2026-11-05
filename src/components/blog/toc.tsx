"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/cn";

/** Table of contents with scroll-spy: the section nearest the top of the viewport is marked with the red square. */
export function Toc({
  items,
  className,
}: {
  items: TocItem[];
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;
  // Section numbers (01, 02…) for h2 items, computed once instead of mutating during render.
  const numbers = items.reduce<number[]>((acc, item, i) => {
    const prev = i === 0 ? 0 : acc[i - 1];
    acc.push(item.depth === 2 ? prev + 1 : prev);
    return acc;
  }, []);
  return (
    <nav aria-label="Contents" className={className}>
      <ol className="text-small">
        {items.map((item, i) => {
          return (
            <li
              key={item.id}
              className={cn(
                "border-b border-rule/20",
                item.depth === 3 && "pl-6",
              )}
            >
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "flex items-center gap-2 py-2 hover:text-accent",
                  active === item.id && "font-bold",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "inline-block size-2 shrink-0",
                    active === item.id ? "bg-accent" : "bg-transparent",
                  )}
                />
                {item.depth === 2 && (
                  <span className="tabular-nums">
                    {String(numbers[i]).padStart(2, "0")}
                  </span>
                )}
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
