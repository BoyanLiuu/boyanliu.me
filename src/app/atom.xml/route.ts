import { buildFeed } from "@/lib/feed";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildFeed(getPosts()).atom1(), {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
