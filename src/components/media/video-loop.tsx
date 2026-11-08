"use client";

import { useSyncExternalStore } from "react";
import { webmSibling } from "@/lib/media";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

/**
 * "GIF-like" muted loop. Visitors who prefer reduced motion see the poster with
 * controls instead, and can choose to play it.
 */
export const VideoLoop = ({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label: string;
}) => {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true, // server and first paint: don't autoplay
  );
  const webm = webmSibling(src);

  return (
    <video
      key={reduced ? "still" : "loop"}
      className="size-full object-cover object-top-left"
      poster={poster}
      aria-label={label}
      muted
      playsInline
      loop
      autoPlay={!reduced}
      controls={reduced}
      preload={reduced ? "none" : "metadata"}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
};
