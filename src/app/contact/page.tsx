import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import {
  Container,
  Display,
  Mark,
  Section,
  Sections,
} from "@/components/swiss/layout";
import { contactCells, contactPath } from "@/config/links";
import { siteConfig } from "@/config/site";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: pageAlternates(contactPath),
  title: siteConfig.ui.contact,
  description: `Send ${siteConfig.author.name} a message.`,
};

/** The other ways to reach me, listed under the form (the form itself is not repeated here). */
const elsewhere = contactCells.filter(
  (cell) => cell.href && cell.href !== contactPath,
);

export default function Contact() {
  return (
    <Container>
      <Display className="pt-10 lg:pt-14">
        {siteConfig.ui.contact}
        <Mark />
      </Display>
      <p className="mt-8 max-w-[34rem] text-lead text-muted">
        Hiring, a project, a question about something I wrote, or just hello —
        write a few lines and it reaches my inbox.
      </p>
      <ContactForm className="mt-10 max-w-[52rem]" />
      <Sections className="mt-6">
        <Section title="Or find me elsewhere">
          <ul className="border-t border-rule pt-4 text-body [&>li+li]:mt-2">
            {elsewhere.map((cell) => {
              const external = /^https?:/.test(cell.href);
              return (
                <li key={cell.label}>
                  <a
                    href={cell.href}
                    title={cell.detail}
                    className="underline underline-offset-4 hover:text-accent"
                    {...(external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {cell.label}
                    {external ? " ↗" : null}
                  </a>
                  {cell.detail ? (
                    <span className="text-small text-muted">
                      {" "}
                      · {cell.detail}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Section>
      </Sections>
    </Container>
  );
}
