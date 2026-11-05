import { buildFeed } from "@/lib/feed";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildFeed(getPosts()).json1(), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
