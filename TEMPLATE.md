# Using this repo as a template

The code is generic; everything specific to one person lives in **`content/`** (plus images in `public/`). To make a new site, keep `src/` as it is and replace the content.

## What is template, what is yours

| Path                                     | Owner     | Notes                                                                                         |
| ---------------------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `content/site.json`                      | **yours** | Name, URL, role, bio, links, nav, feature flags, accent colours, UI labels                    |
| `content/experience.json`                | **yours** | Roles (YYYY-MM dates, impact bullets) and education                                           |
| `content/bookmarks.json`                 | **yours** | Saved links (repos, blogs, articles, sites) with a note on why                                |
| `content/posts/*.mdx`                    | **yours** | Blog posts (frontmatter validated by `content-collections.ts`)                                |
| `content/projects/*.mdx`                 | **yours** | Case studies (frontmatter validated by `content-collections.ts`)                              |
| `public/projects/<slug>/`                | **yours** | Covers (16:10), screenshots, videos, diagrams                                                 |
| `public/resume.pdf`                      | **yours** | Your résumé; the Résumé buttons open it (`pnpm resume:pdf --force` prints one from `/resume`) |
| `src/app/favicon.ico`                    | **yours** | Replace with your own mark                                                                    |
| `LICENSE` (content notice), `README.md`  | **yours** | Copyright holder and description                                                              |
| `src/`, `scripts/`, `e2e/`, config files | template  | Reusable code; no personal values                                                             |

The `*.schema.json` files in `content/` are generated from `src/config/schema.ts` (`pnpm schemas`); don't edit them by hand.

## Start a new site

1. Create a repo from this one (GitHub **Use this template**, or copy it without the git history).
2. Edit `content/site.json` and `content/experience.json`. VS Code autocompletes keys and shows what each one is for.
3. Replace or delete the sample posts and projects; scaffold new ones with `pnpm new:post "Title"` and `pnpm new:project "Title"`.
4. Replace the images in `public/` and `src/app/favicon.ico`.
5. `pnpm check && pnpm test:e2e`, and add your résumé as `public/resume.pdf`.
6. Deploy (see README) and set `NEXT_PUBLIC_SITE_URL`.

## Guard rails

`pnpm dev` and `pnpm build` stop with a readable message when content is wrong, for example:

```text
content/site.json
✖ Unrecognized key: "linkdin"  → at social
✖ Invalid email address         → at author.email
✖ #ff8a80 has 2.28:1 contrast on white; WCAG AA needs 4.5:1  → at theme.accent
```

Other checks: a post that links to an unknown project fails the build; nested post folders are rejected; drafts never reach production. The e2e tests and Lighthouse budgets discover pages from `/search.json`, so they work with any content.

## Customising beyond content

- **Accent colours:** `theme.accent` and `theme.accentDark` in `content/site.json`.
- **Features:** `features.search`, `features.analytics` (Vercel Web Analytics) and `analytics.customEvents` (click events, Vercel Pro) in `content/site.json`.
- **Fonts, grid, type scale:** `src/app/layout.tsx` (fonts) and the `@theme` tokens in `src/app/globals.css`.
- **New frontmatter fields:** add them to `content-collections.ts`; new site settings go in `src/config/schema.ts`, then run `pnpm schemas`.

## Before publishing this as a public template

- Move the sample content to `examples/content/` and have a setup script copy it into `content/`.
- Generic README and LICENSE holder; a demo deployment.
- Translate the remaining hard-coded interface labels into `ui` strings (most labels are already configurable).
- Version releases and keep a changelog, so sites built from it can update.
