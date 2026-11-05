import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { z } from "zod";
import { extractToc } from "./src/lib/toc";

/** Shared Markdown pipeline for posts and (later) projects. */
export const markdownOptions = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    rehypeKatex,
    [
      rehypePrettyCode,
      {
        theme: { light: "min-light", dark: "min-dark" },
        keepBackground: false,
        defaultLang: "plaintext",
      },
    ],
  ],
} satisfies Parameters<typeof compileMDX>[2];

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
  transform: async (document, context) => {
    if (document._meta.path.includes("/")) {
      throw new Error(
        `Posts must live directly in src/content/posts (found ${document._meta.filePath}).`,
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
  content: [posts],
});
