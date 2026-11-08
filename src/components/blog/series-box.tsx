import Link from "next/link";
import { Label } from "@/components/swiss/layout";
import { cn } from "@/lib/cn";

/** "Part 2 of 4" box listing every part of the series, current one marked. */
export const SeriesBox = ({
  name,
  parts,
  current,
}: {
  name: string;
  parts: { slug: string; title: string }[];
  current: string;
}) => {
  const index = parts.findIndex((part) => part.slug === current);
  return (
    <aside
      aria-label={`Series: ${name}`}
      className="mb-10 border-l-2 border-accent pl-5"
    >
      <Label className="block">
        Series · Part {index + 1} of {parts.length}
      </Label>
      <p className="mt-1 font-display text-h3 font-bold">{name}</p>
      <ol className="mt-3 text-small">
        {parts.map((part, i) => (
          <li key={part.slug} className="py-1">
            {part.slug === current ? (
              <span aria-current="page" className="font-bold">
                {String(i + 1).padStart(2, "0")} {part.title}
              </span>
            ) : (
              <Link
                href={`/blog/${part.slug}`}
                className={cn("underline underline-offset-4 hover:text-accent")}
              >
                {String(i + 1).padStart(2, "0")} {part.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </aside>
  );
};
