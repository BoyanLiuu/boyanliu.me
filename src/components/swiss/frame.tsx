import { cn } from "@/lib/cn";

/** 16:10 image frame with a 1px ink border. `muted` = greyscale that turns to colour on hover. */
export function Frame({
  src,
  alt,
  muted = false,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  muted?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative aspect-[16/10] overflow-hidden border border-rule bg-wash",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- covers are SVG; MediaFrame (4.2) adds next/image for raster media */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "size-full object-cover object-top-left transition-[filter] duration-150",
          muted && "grayscale group-hover:grayscale-0",
        )}
      />
    </div>
  );
}
