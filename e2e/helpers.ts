import type { APIRequestContext } from "@playwright/test";

export type IndexItem = {
  kind: "project" | "post" | "page" | "topic";
  title: string;
  href: string;
};

/** Discover real content from the static search index, so tests don't depend on sample posts or projects. */
export async function searchIndex(
  request: APIRequestContext,
): Promise<IndexItem[]> {
  const response = await request.get("/search.json");
  if (!response.ok())
    throw new Error(`/search.json returned ${response.status()}`);
  return response.json();
}
