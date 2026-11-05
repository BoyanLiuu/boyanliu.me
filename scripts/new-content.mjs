#!/usr/bin/env node
/**
 * Scaffold a post or project with valid frontmatter.
 *
 *   pnpm new:post "Cutting cold starts on Lambda"
 *   pnpm new:project "Ledgerline"
 *
 * Never overwrites an existing file. Posts start as drafts (visible in `pnpm dev` only).
 */
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [kind, ...words] = process.argv.slice(2);
const title = words.join(" ").trim();
if (!["post", "project"].includes(kind) || !title) {
  console.error('Usage: pnpm new:post "Title"   |   pnpm new:project "Title"');
  process.exit(1);
}

const slug = title
  .normalize("NFKD")
  .replace(/[̀-ͯ]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 80);
if (!slug) {
  console.error("The title needs at least one letter or digit.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const quote = (s) => JSON.stringify(s);
const dir = kind === "post" ? "content/posts" : "content/projects";
const file = join(dir, `${slug}.mdx`);
if (existsSync(file)) {
  console.error(`Refusing to overwrite ${file}`);
  process.exit(1);
}

const post = `---
title: ${quote(title)}
date: "${today}"
summary: "TODO: one sentence that makes someone want to read this."
tags: []
draft: true
---

TODO: the problem, in one paragraph.

## Context

## What I tried

## What worked

## What I'd do differently
`;

const project = `---
title: ${quote(title)}
summary: "TODO: one line for the card."
outcome: "TODO: the headline result, e.g. p99 3 s → 300 ms"
year: ${today.slice(0, 4)}
role: "TODO: Solo, Tech lead, …"
stack: [todo]
draft: true
cover: /projects/${slug}/cover.png
coverAlt: "TODO: describe what the cover shows"
problem: "TODO"
approach: "TODO"
result: "TODO"
---

## Context

## Problem

## Approach

## Results

## What I'd do differently
`;

writeFileSync(file, kind === "post" ? post : project, { flag: "wx" });
console.log(
  `Created ${file}${kind === "project" ? ` — add the cover at public/projects/${slug}/` : ""}`,
);
