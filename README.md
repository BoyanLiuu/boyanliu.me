# boyanliu.me

Personal portfolio and blog of Shawn Liu ([@BoyanLiuu](https://github.com/BoyanLiuu)): Next.js 16, Tailwind CSS v4, MDX content and a Swiss typographic design.

## Develop

Requirements: Node 24+ and pnpm (via Corepack: `corepack enable`).

```bash
pnpm install
pnpm dev          # http://127.0.0.1:3000 — bound to loopback only; Ctrl+G toggles the grid overlay
pnpm build && pnpm start  # production build; start serves the last build and does NOT pick up edits
pnpm check        # typecheck + lint + unit tests + production build
pnpm test:e2e     # Playwright smoke tests against the production build (run `pnpm build` first)
```

| Script                                                | What it does                                                                                                            |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `pnpm new:post "Title"`                               | Creates `content/posts/<slug>.mdx` as a draft with the recommended outline                                              |
| `pnpm new:project "Title"`                            | Creates `content/projects/<slug>.mdx` as a draft                                                                        |
| `pnpm new:bookmark <url> [--note "…"] [--tags a,b]`   | Adds a bookmark with title, description and kind fetched from the link (GitHub repos via the API); `--dry-run` previews |
| `pnpm media:video <in> public/projects/<slug>/<name>` | Converts a screen recording to MP4 + WebM + poster (needs `ffmpeg`)                                                     |
| `pnpm resume:pdf --force`                             | Replaces `public/resume.pdf` with a printout of `/resume` (run after `pnpm build`)                                      |
| `pnpm format`                                         | Prettier with Tailwind class sorting                                                                                    |

## Make it yours (replace the TODOs)

Everything personal lives in `content/` (see [TEMPLATE.md](TEMPLATE.md)):

1. **`content/site.json`**: role, email, location, bio, LinkedIn, availability, accent colours, feature flags. VS Code autocompletes it from `site.schema.json`.
2. **`content/experience.json`**: real roles with impact bullets and dates; education.
3. **`content/bookmarks.json`**: useful repos, blogs, articles and sites, each with a one-line note (shown on `/bookmarks` and the home page).
4. **`content/projects/`**: replace the three `SAMPLE` case studies. Covers live in `public/projects/<slug>/` (16:10).
5. **`content/posts/`**: your posts in Markdown or MDX. A post first published elsewhere sets `canonical` to the original URL.
6. Put your résumé at `public/resume.pdf`; every Résumé button opens it. (Or generate one from `/resume` with `pnpm build && pnpm resume:pdf --force`.)

Invalid JSON or frontmatter stops `pnpm dev`/`pnpm build` with a readable error. Drafts (`draft: true`) appear in `pnpm dev` only.

## Writing

Posts (`content/posts/`) and projects (`content/projects/`) are Markdown/MDX with validated frontmatter (see `content-collections.ts`). Available in MDX:

- GitHub-flavoured Markdown (tables, task lists, footnotes), math (`$…$`, `$$…$$`), highlighted code with a copy button
- `<Callout title="…">`, `<Figure src alt caption />`
- `<YouTube id title />` (click-to-load) and `<Playground src title />` (StackBlitz / CodeSandbox only)
- Series: `series` + `seriesOrder` frontmatter; `featured: true` puts a post in "Start here"

## Features

Swiss design system (12/8/4-column grid, token-locked colours, light and dark themes) · writing archive with pagination, series, related posts, tags shared with projects · case studies with screenshot, video-loop and SVG media · ⌘K search · printable résumé and PDF · résumé short links `/r` and `/p/<slug>` · Open Graph images, JSON-LD, RSS/Atom/JSON feeds, sitemap · cookie-free Vercel Web Analytics (résumé visits filed under `/from-resume`).

## CI

- **CI** (`.github/workflows/ci.yml`): format, typecheck, lint, unit tests and build; then Playwright smoke tests and Lighthouse budgets against the production build.
- **Links** (`links.yml`): lychee link check on content changes and weekly.

## Deploy (Vercel)

1. Import the GitHub repo in Vercel (framework preset: Next.js; no build overrides).
2. Set `NEXT_PUBLIC_SITE_URL=https://boyanliu.me`.
3. Add the domain `boyanliu.me` (and `www.boyanliu.me` redirecting to it) and update DNS as Vercel instructs.
4. Pull requests get preview deployments automatically.

**Analytics:** `features.analytics` in `content/site.json` loads Vercel Web Analytics; also turn on **Analytics → Web Analytics** in the Vercel project (free on Hobby: page views, referrers, countries, devices; 50k events a month, one month of history). Visits from the résumé short links show in the **Pages** panel under `/from-resume/…`. Click events for the Résumé, Email, LinkedIn and GitHub links are wired up but need a Pro plan: set `analytics.customEvents` to `true` after upgrading.

## Licence

- **Code:** [MIT](LICENSE).
- **Content** (posts, project write-ups, images): © Shawn Liu, all rights reserved.
- **Fonts:** Inter Tight and Inter, SIL Open Font License (`src/assets/fonts/OFL.txt`).
