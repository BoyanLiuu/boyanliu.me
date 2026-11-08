"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * One reaching arm in line art: a pointing hand entering from the left edge, index finger
 * extended to the right. The right-hand copy is the same drawing mirrored. Original artwork.
 */
const HandArt = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 560 290" className={className} aria-hidden>
    <g
      fill="#fff"
      stroke="#171310"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M-10,196 C70,172 160,134 236,108 C266,98 292,78 324,66 C352,56 380,58 400,68 C438,82 482,94 522,104 C542,109 550,120 545,130 C540,139 526,139 511,135 C481,127 450,120 424,118 C436,132 442,154 434,172 C428,184 412,186 406,176 C400,166 404,152 400,140 C402,160 398,180 388,190 C380,198 366,194 366,182 C366,170 372,158 368,148 C364,164 358,180 348,188 C340,195 330,189 332,177 C334,166 340,158 338,150 C318,164 298,172 278,178 C200,198 100,236 -10,290 Z" />
      <path d="M296,150 C328,138 364,128 396,126 C414,125 420,135 411,142 C396,151 366,156 334,164" />
      <path
        d="M524,106 C534,108 540,115 539,122 C531,122 525,117 524,106 Z"
        strokeWidth="2"
      />
      <g fill="none" strokeWidth="1.7">
        <path d="M458,122 q4,-5 9,-1" />
        <path d="M490,128 q3,-4 7,0" />
        <path d="M352,78 q20,-6 38,0" />
        <path d="M262,108 C296,96 326,88 356,90" />
        <path d="M270,170 q10,6 22,2" />
        <path d="M110,168 q56,-18 104,-38" />
        <path d="M414,150 q6,4 12,2" />
        <path d="M378,162 q6,4 11,2" />
      </g>
    </g>
  </svg>
);

/** Raster or SVG hand artwork found in public/hands/ (see the footer); each file is one arm. */
export type HandImages = { left: string; right: string };

/**
 * "Creation of Adam" card: two hands that reach for each other as the page scrolls.
 * Uses `images` (left/right files) when given, otherwise the built-in line-art SVG.
 * Scroll progress is written to `--reach` (0 → 1): 0 when the card's top enters the viewport,
 * 1 at the end of the page (or when its top reaches 15% of the viewport, if that comes first),
 * so the fingertips meet even though the footer is the last thing on the page.
 * Styles: `.reach` in globals.css. Without JS or with reduced motion the hands rest together.
 */
export const ReachingHands = ({
  className,
  images,
}: {
  className?: string;
  images?: HandImages;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.setProperty("--reach", "1");
      return;
    }
    let frame = 0;
    const apply = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const top = element.getBoundingClientRect().top;
      const maxScroll = document.documentElement.scrollHeight - viewport;
      const topAtEnd = top - (maxScroll - window.scrollY);
      const end = Math.max(topAtEnd, viewport * 0.15);
      const span = viewport - end;
      const progress = span <= 0 ? 1 : (viewport - top) / span;
      element.style.setProperty(
        "--reach",
        Math.min(1, Math.max(0, progress)).toFixed(3),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden className={cn("reach", className)}>
      {images ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative art, sized by CSS */}
          <img
            src={images.left}
            alt=""
            loading="lazy"
            className="reach__img reach__img--left"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative art, sized by CSS */}
          <img
            src={images.right}
            alt=""
            loading="lazy"
            className="reach__img reach__img--right"
          />
        </>
      ) : (
        <>
          <HandArt className="reach__hand reach__hand--left" />
          <HandArt className="reach__hand reach__hand--right" />
        </>
      )}
    </div>
  );
};
