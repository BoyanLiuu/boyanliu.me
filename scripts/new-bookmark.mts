/**
 * Add a bookmark to content/bookmarks.json, with details fetched from the link.
 *
 *   pnpm new:bookmark <url> [--note "why it's useful"] [--tags a,b] [--kind repo] [--favorite] [--via <url>] [--dry-run]
 *
 * - GitHub repos: name, description and topics from the GitHub API (set GITHUB_TOKEN to avoid rate limits).
 * - Other pages: <title> / og:title and meta / og:description.
 * The entry is validated with the same schema as the build, and duplicates are rejected.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { bookmarkKinds, bookmarksSchema } from "../src/config/schema.ts";

const FILE = "content/bookmarks.json";
type Kind = (typeof bookmarkKinds)[number];

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    note: { type: "string" },
    tags: { type: "string" },
    kind: { type: "string" },
    via: { type: "string" },
    favorite: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
});

const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const raw =
  positionals[0] ??
  fail(
    "Usage: pnpm new:bookmark <url> [--note …] [--tags a,b] [--kind …] [--favorite]",
  );
let url: URL;
try {
  url = new URL(raw);
} catch {
  fail(`Not a valid URL: ${raw}`);
}
if (!/^https?:$/.test(url!.protocol))
  fail("Only http(s) URLs can be bookmarked.");
if (
  values.kind &&
  !(bookmarkKinds as readonly string[]).includes(values.kind)
) {
  fail(`--kind must be one of: ${bookmarkKinds.join(", ")}`);
}

const toTag = (t: string) =>
  t
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .trim();

async function fetchWithTimeout(target: string, init: RequestInit = {}) {
  return fetch(target, {
    ...init,
    signal: AbortSignal.timeout(10_000),
    redirect: "follow",
  });
}

type Details = {
  title: string;
  description: string;
  kind: Kind;
  tags: string[];
};

async function githubDetails(
  owner: string,
  repo: string,
): Promise<Details | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "boyanliu.me-bookmarks",
  };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetchWithTimeout(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers },
  );
  if (!res.ok) return null;
  const r = (await res.json()) as {
    name: string;
    description: string | null;
    topics?: string[];
  };
  return {
    title: r.name,
    description: r.description ?? "",
    kind: "repo",
    tags: (r.topics ?? []).map(toTag),
  };
}

async function pageDetails(target: URL): Promise<Details | null> {
  const res = await fetchWithTimeout(target.toString(), {
    headers: { "User-Agent": "Mozilla/5.0 (bookmark fetcher)" },
  });
  if (!res.ok || !(res.headers.get("content-type") ?? "").includes("html"))
    return null;
  const html = (await res.text()).slice(0, 1_000_000);
  const meta = (name: string) =>
    html.match(
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${name}["'][^>]*content=["']([^"']*)["']`,
        "i",
      ),
    )?.[1] ??
    html.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${name}["']`,
        "i",
      ),
    )?.[1];
  const title =
    meta("og:title") ??
    html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ??
    target.hostname;
  const description = meta("og:description") ?? meta("description") ?? "";
  const kind: Kind =
    target.pathname === "/" || target.pathname === "" ? "site" : "article";
  return {
    title: decode(title),
    description: decode(description),
    kind,
    tags: [],
  };
}

const gh =
  url!.hostname === "github.com"
    ? url!.pathname.split("/").filter(Boolean)
    : [];
let details: Details | null = null;
try {
  details =
    gh.length >= 2
      ? await githubDetails(gh[0], gh[1])
      : await pageDetails(url!);
} catch (error) {
  console.warn(
    `Could not fetch details (${(error as Error).message}); fill them in by hand.`,
  );
}

const file = JSON.parse(readFileSync(FILE, "utf8")) as {
  $schema?: string;
  bookmarks: { url: string; tags: string[] }[];
};
// Auto-tag only with tags you already use (shared vocabulary); other GitHub topics are printed as suggestions.
const known = new Set(file.bookmarks.flatMap((b) => b.tags));
const fetched = details?.tags ?? [];
const tags = values.tags
  ? values.tags.split(",").map(toTag).filter(Boolean)
  : fetched.filter((t) => known.has(t)).slice(0, 4);
const suggestions = fetched.filter((t) => !tags.includes(t)).slice(0, 8);
const entry = {
  url: url!.toString(),
  title: details?.title || url!.hostname,
  kind: (values.kind as Kind | undefined) ?? details?.kind ?? "site",
  note:
    values.note ??
    (details?.description
      ? `TODO why it's useful — ${details.description}`
      : "TODO: why it's useful"),
  tags,
  added: new Date().toISOString().slice(0, 10),
  favorite: values.favorite,
  ...(values.via ? { via: values.via } : {}),
};

const norm = (u: string) => u.replace(/\/+$/, "").toLowerCase();
if (file.bookmarks.some((b) => norm(b.url) === norm(entry.url)))
  fail(`Already bookmarked: ${entry.url}`);

const next = { ...file, bookmarks: [entry, ...file.bookmarks] };
const result = bookmarksSchema.safeParse(next);
if (!result.success)
  fail(`Invalid bookmark:\n${JSON.stringify(result.error.issues, null, 2)}`);

console.log(JSON.stringify(entry, null, 2));
if (suggestions.length > 0)
  console.log(
    `\nOther GitHub topics (add with --tags): ${suggestions.join(", ")}`,
  );
if (values["dry-run"]) {
  console.log("\n(dry run: nothing written)");
} else {
  writeFileSync(FILE, `${JSON.stringify(next, null, 2)}\n`);
  console.log(
    `\nAdded to ${FILE}.${entry.note.startsWith("TODO") ? " Edit the note to say why it's useful." : ""}`,
  );
}
