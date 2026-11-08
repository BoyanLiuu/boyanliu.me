import Image from "next/image";
import { Label } from "@/components/swiss/layout";
import { cn } from "@/lib/cn";
import { isSvg, type MediaItem } from "@/lib/media";
import { VideoLoop } from "./video-loop";

/**
 * One frame for every kind of project media: fixed 16:10 ratio, rounded with a 1px rule border, optional caption.
 * - raster images: next/image (AVIF/WebP, responsive sizes, lazy unless `priority`)
 * - SVG diagrams: served as-is
 * - video: muted loop (poster only under reduced motion)
 * `muted` renders greyscale that turns to colour on hover (secondary projects).
 */
export function MediaFrame({
  item,
  muted = false,
  priority = false,
  sizes = "(min-width: 1024px) 66vw, 100vw",
  className,
}: {
  item: MediaItem;
  muted?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const visual = cn(
    "size-full object-cover object-top-left transition-[filter] duration-150",
    muted && "grayscale group-hover:grayscale-0",
  );

  return (
    <figure className={className}>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-card border border-rule bg-wash">
        {item.type === "video" ? (
          <VideoLoop src={item.src} poster={item.poster} label={item.alt} />
        ) : isSvg(item.src) ? (
          // eslint-disable-next-line @next/next/no-img-element -- SVGs don't benefit from the image optimiser
          <img
            src={item.src}
            alt={item.alt}
            loading={priority ? "eager" : "lazy"}
            className={visual}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={visual}
          />
        )}
      </div>
      {item.caption && (
        <figcaption className="mt-2">
          <Label>{item.caption}</Label>
        </figcaption>
      )}
    </figure>
  );
}
