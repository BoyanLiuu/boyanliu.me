import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { z } from "zod";
import rehypeLabelCheckboxes from "./src/lib/markdown/rehype-label-checkboxes";
import { swissDark, swissLight } from "./src/lib/markdown/swiss-code-theme";
import { extractToc } from "./src/lib/toc";

/** Shared Markdown pipeline for posts and (later) projects. */
export const markdownOptions = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [
    rehypeSlug,
    rehypeLabelCheckboxes,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    rehypeKatex,
    [
      rehypePrettyCode,
      {
        theme: { light: swissLight, dark: swissDark },
        keepBackground: false,
        defaultLang: "plaintext",
      },
    ],
  ],
} satisfies Parameters<typeof compileMDX>[2];

const isoDate = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: "must be a date such as 2026-10-12",
});

const mediaItem = z.object({
  type: z.enum(["image", "video", "svg"]),
  src: z.string(),
  alt: z.string().min(1),
  poster: z.string().optional(),
  caption: z.string().optional(),
  theme: z.enum(["light", "dark", "any"]).default("any"),
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "*.{md,mdx}",
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    outcome: z.string().min(1),
    year: z.number().int(),
    role: z.string().min(1),
    stack: z.array(z.string()).min(1),
    status: z.enum(["live", "in-progress", "archived"]).default("live"),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().optional(),
    cover: z.string(),
    coverAlt: z.string().min(1),
    problem: z.string().min(1),
    approach: z.string().min(1),
    result: z.string().min(1),
    media: z.array(mediaItem).default([]),
    links: z
      .object({
        repo: z.string().url().optional(),
        demo: z.string().url().optional(),
        video: z.string().url().optional(),
      })
      .default({}),
    github: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, markdownOptions);
    return {
      ...document,
      slug: document._meta.path,
      toc: extractToc(document.content),
      mdx,
    };
  },
});

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string().min(1),
    date: isoDate,
    updated: isoDate.optional(),
    summary: z.string().min(1),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    projects: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const known = context
      .documents(projects)
      .map((project) => project._meta.path);
    const unknown = document.projects.filter((slug) => !known.includes(slug));
    if (unknown.length > 0) {
      throw new Error(
        `Post "${document._meta.filePath}" links to unknown project(s): ${unknown.join(", ")}. Known: ${known.join(", ")}.`,
      );
    }
    if (document._meta.path.includes("/")) {
      throw new Error(
        `Posts must live directly in content/posts (found ${document._meta.filePath}).`,
      );
    }
    const mdx = await compileMDX(context, document, markdownOptions);
    const words = document.content.split(/\s+/).filter(Boolean).length;
    return {
      ...document,
      slug: document._meta.path,
      words,
      readingMinutes: Math.max(1, Math.round(words / 230)),
      toc: extractToc(document.content),
      mdx,
    };
  },
});

export default defineConfig({
  content: [posts, projects],
});
