/**
 * Single source of truth for site-wide settings.
 * Items marked TODO are placeholders to replace with real details before launch.
 */

export type Availability = "open" | "busy" | "hidden";

export type NavItem = { title: string; href: string };

export type SiteConfig = {
  name: string;
  url: string;
  locale: string;
  title: string;
  description: string;
  author: {
    name: string;
    jobTitle: string;
    email: string;
    location: string;
    bio: string;
    availability: Availability;
    availabilityNote: string;
  };
  social: {
    github: string;
    linkedin: string;
    x: string;
  };
  nav: NavItem[];
  features: {
    comments: boolean;
    search: boolean;
    analytics: boolean;
  };
  ui: {
    selectedWork: string;
    writing: string;
    experience: string;
    contact: string;
    readMore: string;
    minRead: string;
    resume: string;
  };
};

export const siteConfig = {
  name: "Shawn Liu",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://boyanliu.me",
  locale: "en-US",
  title: "Shawn Liu — Software Engineer",
  description:
    "Portfolio and writing by Shawn Liu: projects, case studies and notes on building software.",
  author: {
    name: "Shawn Liu",
    jobTitle: "Software Engineer", // TODO: your target role and level
    email: "hello@boyanliu.me", // TODO: a real inbox on your domain
    location: "Seattle — Remote", // TODO
    bio: "TODO: one or two sentences with your specialty and a concrete result.",
    availability: "open" as Availability,
    availabilityNote: "Open to new roles",
  },
  social: {
    github: "https://github.com/BoyanLiuu",
    linkedin: "", // TODO: https://www.linkedin.com/in/<you>
    x: "",
  },
  nav: [
    { title: "Work", href: "/projects" },
    { title: "Writing", href: "/blog" },
    { title: "About", href: "/about" },
  ],
  features: {
    comments: false,
    search: true,
    analytics: false,
  },
  ui: {
    selectedWork: "Selected work",
    writing: "Writing",
    experience: "Experience",
    contact: "Contact",
    readMore: "Read more",
    minRead: "min read",
    resume: "Résumé",
  },
} satisfies SiteConfig;
