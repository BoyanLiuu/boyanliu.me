export type MediaItem = {
  type: "image" | "video" | "svg";
  src: string;
  alt: string;
  poster?: string;
  caption?: string;
  theme?: "light" | "dark" | "any";
};

/** SVGs are served as-is; raster images go through next/image. */
export function isSvg(src: string): boolean {
  return /\.svg(\?.*)?$/i.test(src);
}

/** For a video at /x/demo.mp4, the WebM sibling at /x/demo.webm (produced by `pnpm media:video`). */
export function webmSibling(src: string): string | undefined {
  return /\.mp4$/i.test(src) ? src.replace(/\.mp4$/i, ".webm") : undefined;
}
