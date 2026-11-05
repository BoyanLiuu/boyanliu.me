import GithubSlugger from "github-slugger";

export type TocItem = { depth: 2 | 3; title: string; id: string };

/** Removes inline Markdown so the text matches what rehype-slug sees after rendering. */
export function stripInline(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/**
 * Builds the table of contents from raw Markdown (h2 and h3 only).
 * Every heading is slugged, in order, so duplicate suffixes (-1, -2) match rehype-slug exactly.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let fence: string | null = null;

  for (const line of markdown.split("\n")) {
    const fenceMatch = /^\s*(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
      continue;
    }
    if (fence !== null) continue;

    const heading = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!heading) continue;

    const depth = heading[1].length;
    const title = stripInline(heading[2]);
    const id = slugger.slug(title);
    if (depth === 2 || depth === 3) items.push({ depth, title, id });
  }
  return items;
}
