import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import Link from "next/link";
import { ExperienceRow } from "@/components/about/experience-row";
import {
  Container,
  Display,
  Mark,
  Section,
  Sections,
} from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { experience } from "@/data/experience";
import { getSkillCounts } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: pageAlternates("/about"),
  title: "About",
  description: `About ${siteConfig.author.name}.`,
};

export default function About() {
  const skills = getSkillCounts();
  return (
    <Container>
      <Display className="pt-10 lg:pt-14">
        About
        <Mark />
      </Display>
      <p className="mt-8 max-w-[68ch] text-h3 font-normal">
        {siteConfig.author.bio}
      </p>
      <Sections className="mt-6">
        <Section title={siteConfig.ui.experience}>
          {experience.map((role) => (
            <ExperienceRow
              key={`${role.company}-${role.start}`}
              role={role}
              detailed
            />
          ))}
        </Section>
        <Section title="Skills">
          <p className="mb-4 text-small text-muted">
            Derived from the stacks of my projects; each links to related work.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-4">
            {skills.map(([skill, count]) => (
              <li key={skill}>
                <Link
                  href={`/tags/${skill}`}
                  className="font-display text-h3 font-bold hover:text-accent"
                >
                  {skill}
                </Link>{" "}
                <span className="text-small text-muted">×{count}</span>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Elsewhere">
          <ul className="border-t border-rule pt-4 text-body [&>li+li]:mt-2">
            {siteConfig.social.github && (
              <li>
                <a
                  href={siteConfig.social.github}
                  className="underline underline-offset-4 hover:text-accent"
                >
                  GitHub ↗
                </a>
              </li>
            )}
            {siteConfig.social.linkedin && (
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  className="underline underline-offset-4 hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </li>
            )}
          </ul>
        </Section>
      </Sections>
    </Container>
  );
}
