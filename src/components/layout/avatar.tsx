import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Round portrait from `author.photo`, or the author's initials when no photo is set. Decorative: the name is always shown next to it. */
export const Avatar = ({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  const { photo, name } = siteConfig.author;
  if (photo) {
    return (
      <Image
        src={photo}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-accent font-display font-bold text-paper",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
};
