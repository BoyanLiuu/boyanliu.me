import { getBookmarks } from "@/lib/bookmarks";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { allTopics } from "@/lib/relations";
import { buildSearchIndex } from "@/lib/search";

export const dynamic = "force-static";

export function GET() {
  const posts = getPosts();
  const projects = getProjects();
  return Response.json(
    buildSearchIndex({
      posts,
      projects,
      bookmarks: getBookmarks(),
      topics: allTopics(posts, projects, getBookmarks()),
    }),
  );
}
