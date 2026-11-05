/**
 * Schemas for the instance data in content/*.json.
 * Every key is documented with .describe(); those descriptions become hover docs in the
 * generated JSON Schemas (content/*.schema.json) via `pnpm schemas`.
 * Objects are strict, so a typo such as "linkdin" fails validation instead of being ignored.
 */
import { z } from "zod";

const url = z.url().describe("Absolute https URL");
const optionalUrl = z
  .union([z.url(), z.literal("")])
  .describe("Absolute URL, or empty string to hide");
const hex = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "must be a hex colour like #e30613");

export const siteSchema = z
  .strictObject({
    $schema: z.string().optional(),
    name: z
      .string()
      .min(1)
      .describe("Short site name, used in titles and the header"),
    url: url.describe(
      "Canonical site URL. NEXT_PUBLIC_SITE_URL overrides it at build time",
    ),
    locale: z
      .string()
      .min(2)
      .describe("BCP 47 locale for dates and <html lang>, e.g. en-US"),
    title: z.string().min(1).describe("Default <title> and share title"),
    description: z
      .string()
      .min(1)
      .describe("Default meta description (about 150 characters)"),
    author: z.strictObject({
      name: z.string().min(1),
      jobTitle: z
        .string()
        .min(1)
        .describe("Role shown in the hero, résumé and share cards"),
      email: z.email(),
      location: z
        .string()
        .describe("Shown in the hero and résumé; empty to hide"),
      bio: z
        .string()
        .min(1)
        .describe("One or two sentences: specialty plus a concrete result"),
      availability: z
        .enum(["open", "busy", "hidden"])
        .describe("Hero badge: open, busy or hidden"),
      availabilityNote: z
        .string()
        .describe("Text next to the badge, e.g. 'Open to new roles'"),
      copyrightStart: z
        .number()
        .int()
        .min(1990)
        .describe("First year in the © line"),
    }),
    social: z.strictObject({
      github: optionalUrl,
      linkedin: optionalUrl,
      x: optionalUrl,
    }),
    nav: z
      .array(
        z.strictObject({
          title: z.string().min(1),
          href: z.string().startsWith("/"),
        }),
      )
      .min(1)
      .describe("Header navigation, in order"),
    features: z.strictObject({
      comments: z
        .boolean()
        .describe("Reserved for Giscus comments (not built yet)"),
      search: z.boolean().describe("⌘K search palette"),
      analytics: z
        .boolean()
        .describe("Load Plausible analytics (needs a Plausible site)"),
    }),
    analytics: z.strictObject({
      domain: z.string().min(1).describe("Plausible site domain"),
      scriptSrc: url.describe("Plausible script URL"),
    }),
    theme: z.strictObject({
      accent: hex.describe(
        "Accent on white; needs ≥ 4.5:1 contrast (checked at build)",
      ),
      accentDark: hex.describe(
        "Accent on black in dark mode; needs ≥ 4.5:1 contrast",
      ),
    }),
    ui: z
      .strictObject({
        selectedWork: z.string(),
        writing: z.string(),
        experience: z.string(),
        contact: z.string(),
        readMore: z.string(),
        minRead: z.string(),
        resume: z.string(),
      })
      .describe("Interface labels"),
  })
  .describe("Site settings for this portfolio");

export type SiteData = z.infer<typeof siteSchema>;

const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "must be YYYY-MM, e.g. 2023-04");

export const experienceSchema = z
  .strictObject({
    $schema: z.string().optional(),
    roles: z
      .array(
        z.strictObject({
          company: z.string().min(1),
          title: z.string().min(1),
          start: yearMonth.describe("Start month, YYYY-MM"),
          end: yearMonth
            .optional()
            .describe("End month, YYYY-MM; omit for your current role"),
          location: z.string().optional(),
          highlights: z
            .array(z.string().min(1))
            .min(1)
            .describe("Impact bullets, ideally with numbers"),
          stack: z.array(z.string()).optional(),
        }),
      )
      .describe("Most recent first. The home page shows the first three"),
    education: z.array(
      z.strictObject({
        school: z.string().min(1),
        degree: z.string().min(1),
        year: z.string(),
      }),
    ),
  })
  .describe("Work history and education for /about and /resume");

export type ExperienceData = z.infer<typeof experienceSchema>;
