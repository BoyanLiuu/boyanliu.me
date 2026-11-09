# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Recruiters and hiring managers** evaluating Shawn for frontend roles. Within seconds they need to know who he is, what he does and where the résumé and contact links are, then they dig into case studies. The site is a standing hiring signal even while he is employed.
- **Engineering peers and readers** who come for writing, case studies, bookmarks and the changelog, and follow the work over time.

The owner is a Frontend Engineer at Amazon Web Services (since Sep 2022). Availability messaging is currently hidden (`author.availability: "hidden"` in `content/site.json`).

## Product Purpose

The personal portfolio and blog of Shawn Liu at boyanliu.me: case studies, writing, bookmarks, an expandable work history, a downloadable résumé, a GitHub activity view and a changelog.

Success means a recruiter reaches the résumé or a contact link quickly, with a clear picture of his strengths, and a peer finds something worth reading or bookmarking and comes back.

## Positioning

What the site should make Shawn known for (confirmed by the owner; facts from `public/resume.pdf`, Sep 2025):

1. **Production AWS console work at scale:** the Bedrock AgentCore Identity Console, the Managed Login Customization Studio, and Cognito Console features (Terms & Conditions, Access Token Customization, Advanced Security Settings) used by thousands of customers.
2. **Accessibility and quality:** 249+ accessibility violations remediated to WCAG compliance, 90%+ test coverage with Jest and Playwright, 7,000+ unit tests migrated from Jest to Vitest, and CDK pipeline deployments 32% faster across 30 AWS regions.
3. **Design-to-code craft:** faithful, polished, responsive and animated UIs built from designs, shown by 19 Frontend Mentor builds and by this site itself.

## Operating Context

- Visitors arrive from résumé links (short links `/r` and `/p/<slug>` add `?ref=resume`), LinkedIn, GitHub and search, many of them on phones.
- **Recruiter path:** hero, then Résumé (opens `/resume.pdf` in a new tab), Email, LinkedIn or GitHub, then the Selected work case studies.
- **Peer path:** Writing (series, tags, RSS/Atom/JSON feeds), Bookmarks, ⌘K search, the Changelog.
- The owner edits content in `content/` (`site.json`, `experience.json`, `bookmarks.json`, `changelog.json`, `posts/`, `projects/`) and deploys by pushing to `main` (Vercel).

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind CSS v4 and MDX via content-collections. Static-first (Cache Components off), deployed on Vercel, pnpm via Corepack.
- **Template/content split:** `src/` stays generic and reusable; everything personal lives in `content/` and `public/` (see TEMPLATE.md). Content JSON is validated with zod at build time, and invalid content fails the build.
- Accent colours must pass WCAG AA (at least 4.5:1); this is checked at build time.
- The e2e "5-second test" at 1440×900 requires the headline, résumé and contact links above the fold, and the first project to start within half a screen below it.
- Dev and production servers bind to 127.0.0.1 only.
- Lint enforces arrow functions and modern syntax; Next.js route files and `scripts/` are exempt.
- GitHub activity is fetched at build time and revalidated daily, from GitHub GraphQL when `GITHUB_TOKEN` is set and otherwise from a public mirror. If both fail, the tile falls back to a profile link.
- **Terminology:** Work (projects and case studies), Writing (posts), Bookmarks, Changelog, Résumé (always with the accents).
- **Undecided:** whether the three sample projects and the Markdown style-guide post stay public (kept visible for now by the owner's choice). No portrait photo has been provided yet (`author.photo`).

## Brand Commitments

- **Public name:** Shawn Liu. Mention Boyan Liu where it helps people connect the résumé (which uses "Boyan Liu"), the GitHub handle (BoyanLiuu) and the domain (boyanliu.me).
- **Role line:** "Frontend engineer @ amazon".
- **Voice:** first person, plain and specific. Every claim must trace to the résumé, a repository or a live site.
- **Owner-chosen references,** already built into the site: sudhanva.space (layout and motion), iamrob.in/changelog (changelog format), vaibhaverma.netlify.app (the reaching-hands footer) and amandzn.framer.website (the stacking work cards).

## Evidence on Hand

- **Résumé:** `public/resume.pdf` (Sep 2025). It includes a home address and phone number, which the owner chose to publish.
- **Work history:** `content/experience.json`, with 5 roles and education (University of Maryland, College Park, B.S. in Computer Science, 2020).
- **Case studies:** `content/projects/dark-room.mdx` (TMDB movie site, with repo and GitHub Pages demo) and `content/projects/frontend-mentor.mdx` (19 builds, screenshots in `public/projects/frontend-mentor/`, with live and code links).
- **Live data and lists:** GitHub contributions, and 13 bookmarks in `content/bookmarks.json`.
- **Hand illustration:** `public/hands/left.png` and `right.png`. This is third-party artwork from Vaibhav Verma's portfolio, used at the owner's request; its licence is not confirmed.
- **Placeholders that must never be presented as real work:** the Ledgerline, Pulse and Splitter projects (marked "SAMPLE"), and the TODO line in the "Hello, world" post.
- **Absent, do not fabricate:** a portrait photo, testimonials, metrics beyond the résumé, client logos, and live URLs for the unlisted Frontend Mentor builds (Skilled e-learning, Sunnyside, Todo app).

## Product Principles

1. Serve both audiences in one pass: the recruiter's fast path (who, role, résumé, contact, first project) is never buried by the peer's depth.
2. Every claim traces to the résumé, a repository or a live site. No invented metrics.
3. Content is data: edit `content/`, not components, and let the build guard it.
4. The site demonstrates the craft it claims, so it must meet the accessibility and quality standards it describes.
5. Curate rather than list everything: milestones not commits, featured work first, samples clearly marked as samples.

## Accessibility & Inclusion

WCAG 2.2 AA:

- contrast of at least 4.5:1, with accent colours validated at build time;
- visible keyboard focus and targets of at least 24px;
- semantic landmarks and named controls for screen readers;
- `prefers-reduced-motion` respected, with animations off and static fallbacks;
- content stays readable when JavaScript does not run.
