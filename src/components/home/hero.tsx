import Image from "next/image";
import { ContactLinks } from "@/components/layout/contact-links";
import { RotatingWords } from "@/components/motion/rotating-words";
import { TechStack } from "./tech-stack";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const availabilityDot: Record<string, string> = {
  open: "bg-[#2f9e5b]",
  busy: "bg-[#d99a1e]",
};

/** Tilted photo card with a handwritten caption; drops in on load (`.polaroid`). Shows initials until `author.photo` is set. */
const Polaroid = () => {
  const { photo, name, location } = siteConfig.author;
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
  return (
    <figure className="polaroid mx-auto w-full max-w-[21rem] rounded-card border border-rule bg-paper p-3.5 pb-0 shadow-lift lg:mx-0 lg:ml-auto">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-wash">
        {photo ? (
          <Image
            src={photo}
            alt={`Portrait of ${name}`}
            fill
            priority
            sizes="(min-width: 1024px) 21rem, 80vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 grid place-items-center bg-[radial-gradient(color-mix(in_srgb,var(--color-ink)_14%,transparent)_1px,transparent_1px)] bg-[size:14px_14px]"
          >
            <span className="font-display text-[7rem] leading-none font-bold tracking-[-0.04em] text-accent">
              {initials}
            </span>
          </div>
        )}
      </div>
      <figcaption className="py-3 text-center font-hand text-[1.45rem] leading-tight font-semibold text-muted">
        {location ? `Based in ${location}` : name}
      </figcaption>
    </figure>
  );
};

/**
 * Availability badge, two-tone headline (the accent phrase can cycle), bio and contact pills,
 * with the photo card beside them. Each piece enters in sequence on load.
 */
export const Hero = () => {
  const { author } = siteConfig;
  const headline = author.headline ?? `${author.name},`;
  const accent = author.headlineAccent ?? `${author.jobTitle.toLowerCase()}.`;
  const accentWords = Array.isArray(accent) ? accent : [accent];
  return (
    <section
      aria-label="Introduction"
      className="grid items-center gap-x-16 gap-y-12 pt-8 pb-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:px-8 lg:pt-12"
    >
      <div>
        <p className="enter-up inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-rule px-4 py-2 text-small text-muted [animation-delay:120ms]">
          {author.availability !== "hidden" && (
            <>
              <span className="relative flex size-2">
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:hidden",
                    availabilityDot[author.availability],
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "relative size-2 rounded-full",
                    availabilityDot[author.availability],
                  )}
                />
              </span>
              <span className="font-semibold text-ink">
                {author.availabilityNote}
              </span>
              <span aria-hidden>·</span>
            </>
          )}
          <span>
            {author.jobTitle}
            {author.company && (
              <>
                {" "}
                <span aria-hidden>@</span>
                <span className="sr-only">at</span>{" "}
                <strong className="font-display font-bold tracking-[-0.01em] text-ink">
                  {author.company}
                </strong>
              </>
            )}
          </span>
        </p>
        <h1 className="enter-up mt-6 font-display text-display font-semibold text-balance [--enter-y:2.5rem] [animation-delay:220ms] [animation-duration:1s]">
          {headline}{" "}
          <RotatingWords words={accentWords} className="text-accent" />
        </h1>
        <p className="enter-up mt-6 max-w-[34rem] text-lead text-muted [animation-delay:380ms]">
          {author.bio}
        </p>
        <ContactLinks className="mt-8" animateIn />
        <TechStack className="mt-10 lg:mt-12" />
      </div>
      <Polaroid />
    </section>
  );
};
