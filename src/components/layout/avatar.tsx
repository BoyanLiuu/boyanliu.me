import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/initials";

/** Round portrait from `author.avatar` (or `author.photo`), or the author's initials when neither is set. Decorative: the name is always shown next to it. */
export const Avatar = ({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  const { name } = siteConfig.author;
  const photo = siteConfig.author.avatar ?? siteConfig.author.photo;
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
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-accent font-display font-bold text-paper",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials(name)}
    </span>
  );
};
