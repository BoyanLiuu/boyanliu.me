import Image from "next/image";
import { Morph } from "@/components/motion/morph";
import { Label } from "@/components/swiss/layout";
import { cn } from "@/lib/cn";
import { isSvg, type MediaItem } from "@/lib/media";
import { VideoLoop } from "./video-loop";

/**
 * One frame for every kind of project media: fixed 16:10 ratio, rounded with a 1px rule border, optional caption.
 * - raster images: next/image (AVIF/WebP, responsive sizes, lazy unless `priority`)
 * - SVG diagrams: served as-is
 * - video: muted loop (poster only under reduced motion)
 */
export const MediaFrame = ({
  item,
  priority = false,
  sizes = "(min-width: 1024px) 66vw, 100vw",
  className,
  morph,
}: {
  item: MediaItem;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Shared-element name: the frame morphs to or from the same name on another page. */
  morph?: string;
}) => {
  const visual = cn(
    "size-full object-cover object-top-left transition-[filter] duration-150",
  );

  const frame = (
    <div
      className={cn(
        "group relative aspect-[16/10] overflow-hidden rounded-card border border-rule bg-wash",
        morph && "morph-cover",
      )}
    >
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
  );

  return (
    <figure className={className}>
      {morph ? <Morph name={morph}>{frame}</Morph> : frame}
      {item.caption && (
        <figcaption className="mt-2">
          <Label>{item.caption}</Label>
        </figcaption>
      )}
    </figure>
  );
};
