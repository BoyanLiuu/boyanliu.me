import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { roleDates } from "@/components/about/experience-row";
import { Container, Label, Mark } from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { eventClass, events } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { education, experience } from "@/data/experience";
import { getSkillCounts } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: pageAlternates("/resume"),
  title: "Résumé",
  description: `Résumé of ${siteConfig.author.name}.`,
};

/** ATS-friendly, single-column-readable résumé on the grid. Prints cleanly to A4 (header and footer hidden). */
export default function Resume() {
  const { author, social } = siteConfig;
  return (
    <Container className="print:px-0">
      <div className="grid grid-cols-4 gap-x-4 border-b-2 border-rule pt-10 pb-6 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 print:pt-0">
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <h1 className="font-display text-h1 font-bold">
            {author.name}
            <Mark />
          </h1>
          <p className="mt-2 text-h3">{author.jobTitle}</p>
        </div>
        <address className="col-span-4 mt-4 text-small not-italic md:col-span-3 md:mt-0 md:text-right lg:col-span-4">
          {author.location && <span className="block">{author.location}</span>}
          <a
            href={`mailto:${author.email}`}
            className="block underline underline-offset-4"
          >
            {author.email}
          </a>
          {social.linkedin && (
            <span className="block">
              {social.linkedin.replace("https://", "")}
            </span>
          )}
          {social.github && (
            <span className="block">
              {social.github.replace("https://", "")}
            </span>
          )}
          <span className="block">
            {siteConfig.url.replace("https://", "")}
          </span>
        </address>
      </div>
      <a
        href="/resume.pdf"
        className={cn(
          "mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-small font-semibold text-paper print:hidden",
          eventClass(events.resumeDownload),
        )}
      >
        Download PDF ↓
      </a>

      <section aria-labelledby="summary" className="mt-8">
        <h2 id="summary" className="text-label font-medium uppercase">
          Summary
        </h2>
        <p className="mt-2 max-w-[80ch] text-body">{author.bio}</p>
      </section>

      <section aria-labelledby="experience" className="mt-8">
        <h2
          id="experience"
          className="border-b border-rule pb-1 text-label font-medium uppercase"
        >
          Experience
        </h2>
        {experience.map((role) => (
          <article
            key={`${role.company}-${role.start}`}
            className="mt-4 break-inside-avoid"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-display text-h3 font-bold">
                {role.title}, {role.company}
              </h3>
              <Label>{roleDates(role)}</Label>
            </div>
            <ul className="mt-2 list-[square] pl-5 text-body marker:text-accent">
              {role.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section aria-labelledby="skills" className="mt-8">
        <h2
          id="skills"
          className="border-b border-rule pb-1 text-label font-medium uppercase"
        >
          Skills
        </h2>
        <p className="mt-2 text-body">
          {getSkillCounts()
            .map(([skill]) => skill)
            .join(" · ")}
        </p>
      </section>

      <section aria-labelledby="education" className="mt-8">
        <h2
          id="education"
          className="border-b border-rule pb-1 text-label font-medium uppercase"
        >
          Education
        </h2>
        {education.map((item) => (
          <p key={item.school} className="mt-2 text-body">
            {item.degree}, {item.school} · {item.year}
          </p>
        ))}
      </section>
    </Container>
  );
}
