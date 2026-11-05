import Link from "next/link";
import { eventClass } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export type LinkCell = {
  label: string;
  detail?: string;
  href: string;
  primary?: boolean;
  /** Plausible tagged-event name recorded on click (when analytics is on). */
  event?: string;
};

const lgCols: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** Equal cells separated by 1px rules. The primary cell is red. An odd last cell spans both columns on phones. */
export function LinkBar({
  cells,
  label,
  className,
}: {
  cells: LinkCell[];
  label: string;
  className?: string;
}) {
  const visible = cells.filter((cell) => cell.href);
  return (
    <nav
      aria-label={label}
      className={cn(
        "grid grid-cols-2 gap-px border-y border-rule bg-rule",
        lgCols[visible.length],
        className,
      )}
    >
      {visible.map((cell, index) => {
        const classes = cn(
          "p-4 font-display text-h3 font-bold lg:p-5",
          cell.primary
            ? "bg-accent text-paper"
            : "truncate bg-paper hover:text-accent",
          index === visible.length - 1 &&
            visible.length % 2 === 1 &&
            "col-span-2 lg:col-span-1",
          cell.event && eventClass(cell.event),
        );
        const content = cell.detail ? (
          <>
            <span className="lg:hidden">{cell.label}</span>
            <span className="hidden lg:inline">{cell.detail}</span>
          </>
        ) : (
          cell.label
        );
        return cell.href.startsWith("/") ? (
          <Link key={cell.label} href={cell.href} className={classes}>
            {content}
          </Link>
        ) : (
          <a key={cell.label} href={cell.href} className={classes}>
            {content}
          </a>
        );
      })}
    </nav>
  );
}
