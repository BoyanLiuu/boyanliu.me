import { MediaFrame } from "@/components/media/media-frame";

/** Project cover: a MediaFrame for an image or SVG. Kept as a small wrapper for the card components. */
export const Frame = ({
  src,
  alt,
  priority = false,
  className,
  morph,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  morph?: string;
}) => (
  <MediaFrame
    item={{ type: "image", src, alt }}
    priority={priority}
    sizes="(min-width: 1024px) 50vw, 100vw"
    className={className}
    morph={morph}
  />
);
