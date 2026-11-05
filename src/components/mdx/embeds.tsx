"use client";

import { useState } from "react";
import { Label } from "@/components/swiss/layout";
import { isAllowedPlayground, isYouTubeId } from "@/lib/embed";

/** Click-to-load YouTube: nothing is requested from YouTube until the reader presses play. */
export function YouTube({ id, title }: { id: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  if (!isYouTubeId(id)) return null;
  return (
    <figure className="my-8">
      <div className="relative aspect-video border border-rule bg-wash">
        {loaded ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="absolute inset-0 flex flex-col items-start justify-end gap-2 p-5 text-left hover:text-accent"
          >
            <span className="font-display text-h2 font-bold">▶ Play video</span>
            <span className="text-small text-muted">
              {title} · loads from YouTube
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}

/** Sandboxed code playground (StackBlitz / CodeSandbox only), lazy-loaded. */
export function Playground({
  src,
  title,
  height = 480,
}: {
  src: string;
  title: string;
  height?: number;
}) {
  if (!isAllowedPlayground(src)) return null;
  return (
    <figure className="my-8">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{ height }}
        className="w-full border border-rule"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <figcaption className="mt-2">
        <Label>{title}</Label>
      </figcaption>
    </figure>
  );
}
