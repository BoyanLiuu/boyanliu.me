import { buildFeed } from "@/lib/feed";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildFeed(getPosts()).rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
