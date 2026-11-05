import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";
import {
  Container,
  Display,
  Grid,
  Label,
  Mark,
  Row,
  Rule,
  Section,
  Sections,
} from "@/components/swiss/layout";

export const metadata: Metadata = {
  title: "UI gallery",
  robots: { index: false },
};

/** Development-only gallery of the Swiss primitives. Returns 404 in production builds. */
export default function UiGallery() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <Container className="py-10">
      <div className="flex justify-between text-small">
        <Label>UI gallery · press Ctrl+G for the grid</Label>
        <ThemeToggle className="underline underline-offset-4" />
      </div>
      <Rule weight={2} className="mt-3" />
      <Display className="mt-10">
        {siteConfig.name}
        <Mark />
      </Display>
      <Sections className="mt-10">
        <Section title="Typography">
          <p className="font-display text-h1 font-bold">Heading 1</p>
          <p className="font-display text-h2 font-bold">Heading 2</p>
          <p className="font-display text-h3 font-bold">Heading 3</p>
          <p className="mt-4 max-w-[68ch] text-body">
            Body text at 18/28. The quick brown fox jumps over the lazy dog,
            with a{" "}
            <a className="underline underline-offset-4" href="#">
              link
            </a>
            .
          </p>
          <p className="mt-2 text-small text-muted">
            Small text for captions and metadata.
          </p>
          <Label className="mt-2 block">Label text</Label>
        </Section>
        <Section title="Rows">
          {["Ledgerline", "Pulse", "Splitter"].map((name, i) => (
            <Row key={name}>
              <p className="col-span-4 font-display text-h3 font-bold md:col-span-3">
                {name}
              </p>
              <p className="col-span-4 text-body md:col-span-3 lg:col-span-5">
                Placeholder description.
              </p>
              <p className="col-span-2 font-display text-h3 font-bold text-accent lg:col-span-3">
                {i + 1}× faster
              </p>
              <Label className="col-span-2 text-right lg:col-span-1">
                {2026 - i}
              </Label>
            </Row>
          ))}
        </Section>
        <Section title="Grid">
          <Grid className="gap-y-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="border border-rule bg-wash p-2 text-label"
              >
                {i + 1}
              </div>
            ))}
          </Grid>
        </Section>
      </Sections>
    </Container>
  );
}
