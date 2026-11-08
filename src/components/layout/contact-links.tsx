import { DownloadSimpleIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import { contactCells } from "@/config/links";
import { eventClass } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * Contact pills: the résumé as the filled accent pill (icon slides in on hover), the rest outlined.
 * `tone="night"` is for the dark footer surface. `animateIn` pops the pills in one after another on load.
 */
export const ContactLinks = ({
  label = "Contact",
  tone = "paper",
  animateIn = false,
  className,
}: {
  label?: string;
  tone?: "paper" | "night";
  animateIn?: boolean;
  className?: string;
}) => {
  const visible = contactCells.filter((cell) => cell.href);
  return (
    <nav aria-label={label} className={cn("flex flex-wrap gap-2.5", className)}>
      {visible.map((cell, index) => {
        const entrance = animateIn
          ? {
              className: "pop-in",
              style: { animationDelay: `${500 + index * 70}ms` },
            }
          : { className: "", style: undefined };
        if (cell.primary) {
          return (
            <span
              key={cell.label}
              className={cn("inline-flex", entrance.className)}
              style={entrance.style}
            >
              <Pill
                href={cell.href}
                icon={<DownloadSimpleIcon size={18} weight="bold" />}
                className={cn(
                  "text-small",
                  cell.event && eventClass(cell.event),
                )}
              >
                {cell.label}
              </Pill>
            </span>
          );
        }
        const classes = cn(
          "inline-flex h-11 items-center rounded-full px-5 text-small font-semibold transition-[background-color,border-color,translate] duration-300 ease-out-soft hover:-translate-y-0.5",
          tone === "night"
            ? "border border-night-rule text-night-ink hover:border-night-ink"
            : "border border-rule hover:border-ink hover:bg-wash",
          entrance.className,
          cell.event && eventClass(cell.event),
        );
        const external = /^https?:/.test(cell.href);
        const content = (
          <>
            {cell.label}
            {external && <span aria-hidden>&nbsp;↗</span>}
          </>
        );
        return cell.href.startsWith("/") ? (
          <Link
            key={cell.label}
            href={cell.href}
            className={classes}
            style={entrance.style}
          >
            {content}
          </Link>
        ) : (
          <a
            key={cell.label}
            href={cell.href}
            className={classes}
            style={entrance.style}
            title={cell.detail}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {content}
          </a>
        );
      })}
    </nav>
  );
};
