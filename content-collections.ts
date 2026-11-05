import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const isoDate = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: "must be a date such as 2026-10-12",
});

const posts = defineCollection({
  name: "posts",
  directory: "src/content/posts",
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
    content: z.string(),
  }),
  transform: async (document) => {
    const words = document.content.split(/\s+/).filter(Boolean).length;
    return {
      ...document,
      slug: document._meta.path,
      words,
      readingMinutes: Math.max(1, Math.round(words / 230)),
    };
  },
});

export default defineConfig({
  content: [posts],
});
