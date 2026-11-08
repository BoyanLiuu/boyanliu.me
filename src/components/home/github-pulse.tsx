"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import {
  type CSSProperties,
  type PointerEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { ContributionGraph, ContributionLevel } from "@/lib/github";

/*
 * A 15×7 mini contribution grid that plays three phases on a 170ms tick:
 *   shimmer – a seeded random pattern where ~14% of cells re-roll each tick (2.9s),
 *   heart   – a heart ripples out from the centre and beats once (2.7s), then back to shimmer;
 *   hello   – while hovered or open, "hello" in a 3×5 pixel font wipes in left to right.
 * The tick only runs while the tile is on screen, the tab is visible and the tile is idle.
 * Hover (mouse) or click opens the full-year calendar; Escape or a click outside closes it.
 */

const COLUMNS = 15;
const CELLS = COLUMNS * 7;
const TICK_MS = 170;
const SHIMMER_MS = 2900;
const HEART_MS = 2700;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const row = (index: number) => Math.floor(index / COLUMNS);
const column = (index: number) => index % COLUMNS;

/** Random level with roughly GitHub's distribution: mostly empty, a few dark cells. */
const randomLevel = (random: () => number): ContributionLevel => {
  const value = random();
  return value < 0.34
    ? 0
    : value < 0.58
      ? 1
      : value < 0.78
        ? 2
        : value < 0.92
          ? 3
          : 4;
};

/** Small seeded PRNG so the first frame is identical on the server and the client. */
const seededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 0x100000000;
  };
};

const firstFrame: ContributionLevel[] = (() => {
  const random = seededRandom(569);
  return Array.from({ length: CELLS }, () => randomLevel(random));
})();

const HEART_ROWS = [
  ".XXX.XXX.",
  "XXXXXXXXX",
  "XXXXXXXXX",
  ".XXXXXXX.",
  "..XXXXX..",
  "...XXX...",
  "....X....",
];
const heartOffset = (COLUMNS - HEART_ROWS[0]!.length) / 2;
const heart: ContributionLevel[] = Array.from({ length: CELLS }, (_, index) =>
  HEART_ROWS[row(index)]?.[column(index) - heartOffset] === "X" ? 4 : 0,
);
/** Ripple delay: Manhattan distance from the centre cell, 32ms per step. */
const rippleDelay = Array.from(
  { length: CELLS },
  (_, index) => (Math.abs(row(index) - 3) + Math.abs(column(index) - 7)) * 32,
);

const FONT: Record<string, string[]> = {
  h: ["X..", "X..", "XXX", "X.X", "X.X"],
  e: ["...", ".X.", "XXX", "X..", ".XX"],
  l: ["X", "X", "X", "X", "X"],
  o: ["...", ".X.", "X.X", "X.X", ".X."],
};
const helloRows = ["", "", "", "", ""];
[..."hello"].forEach((letter, letterIndex) => {
  FONT[letter]!.forEach((line, lineIndex) => {
    helloRows[lineIndex] += (letterIndex ? "." : "") + line;
  });
});
const hello: ContributionLevel[] = Array.from({ length: CELLS }, (_, index) => {
  const line = row(index) - 1;
  return line >= 0 && line < 5 && helloRows[line]![column(index)] === "X"
    ? 4
    : 0;
});

const dayTitle = (date: string, count: number) => {
  const [year, month, day] = date.split("-").map(Number) as [
    number,
    number,
    number,
  ];
  const amount =
    count === 0
      ? "No contributions"
      : `${count} contribution${count === 1 ? "" : "s"}`;
  return `${amount} on ${MONTHS[month - 1]} ${day}, ${year}`;
};

export const GithubPulse = ({
  graph,
  profile,
  locale,
}: {
  graph: ContributionGraph | null;
  profile: string;
  locale: string;
}) => {
  const [cells, setCells] = useState<ContributionLevel[]>(firstFrame);
  const [phase, setPhase] = useState<"shimmer" | "heart">("shimmer");
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const active = open || hovered;
  const pausedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const panelId = useId();

  // The shimmer → heart → shimmer loop.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let visible = false;
    let elapsed = 0;
    let current: "shimmer" | "heart" = "shimmer";
    const timer = window.setInterval(() => {
      if (!visible || document.hidden || pausedRef.current) return;
      elapsed += TICK_MS;
      if (current === "shimmer") {
        if (elapsed >= SHIMMER_MS) {
          current = "heart";
          elapsed = 0;
          setPhase("heart");
          setCells(heart);
          return;
        }
        setCells((previous) =>
          previous.map((level) =>
            Math.random() < 0.14 ? randomLevel(Math.random) : level,
          ),
        );
      } else if (elapsed >= HEART_MS) {
        current = "shimmer";
        elapsed = 0;
        setPhase("shimmer");
        setCells(Array.from({ length: CELLS }, () => randomLevel(Math.random)));
      }
    }, TICK_MS);
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    observer.observe(root);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    pausedRef.current = active;
  }, [active]);

  // Close on Escape (returning focus to the tile) or on a click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onEnter = useCallback((event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);
  const onLeave = useCallback((event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  }, []);

  const shown = active ? hello : cells;
  const grid = (
    <span
      className="gh-pulse__grid"
      data-phase={active ? "hello" : phase}
      aria-hidden
    >
      {shown.map((level, index) => (
        <span
          key={index}
          className="gh-pulse__cell"
          data-l={level}
          data-heart={heart[index] ? "" : undefined}
          style={
            {
              "--d": `${rippleDelay[index]}ms`,
              "--x": `${column(index) * 22}ms`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );

  if (!graph) {
    return (
      <div
        ref={rootRef}
        className="gh-pulse"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <a
          className="gh-pulse__tile"
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="My GitHub profile"
        >
          {grid}
        </a>
      </div>
    );
  }

  const format = (value: number) => value.toLocaleString(locale);
  return (
    <div
      ref={rootRef}
      className="gh-pulse"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        className="gh-pulse__tile"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Show my GitHub contributions"
        onClick={() => setOpen((value) => !value)}
      >
        {grid}
      </button>
      <div
        id={panelId}
        className="gh-graph"
        data-open={open ? "true" : "false"}
        role="group"
        aria-label="GitHub contributions in the last year"
        aria-hidden={!open}
      >
        <p className="gh-graph__total">
          <strong>{format(graph.total)}</strong> contributions in the last year
        </p>
        <section className="gh-graph__account" aria-label="GitHub">
          <div className="gh-graph__account-head">
            <span className="gh-graph__account-name">GitHub</span>
            <a
              href={graph.profile}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
            >
              @{graph.user}
              <ArrowUpRightIcon size={12} weight="bold" aria-hidden />
            </a>
            <span className="gh-graph__account-total">
              {format(graph.total)}
            </span>
          </div>
          <div
            className="gh-graph__months"
            style={
              {
                "--gh-cols": Math.ceil(graph.months.length / 2),
              } as CSSProperties
            }
          >
            {graph.months.map((month) => (
              <div key={month.key} className="gh-graph__month">
                <span className="gh-graph__month-label">{month.label}</span>
                <span className="gh-graph__month-grid">
                  {month.weeks.flatMap((week, weekIndex) =>
                    week.map((day, dayIndex) =>
                      day ? (
                        <span
                          key={`${weekIndex}-${dayIndex}`}
                          className="gh-graph__day"
                          data-l={day.l}
                          title={dayTitle(day.d, day.c)}
                        />
                      ) : (
                        <span
                          key={`${weekIndex}-${dayIndex}`}
                          className="gh-graph__day gh-graph__day--empty"
                        />
                      ),
                    ),
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>
        <div className="gh-graph__legend" aria-hidden>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className="gh-graph__day" data-l={level} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
