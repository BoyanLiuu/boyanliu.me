import { describe, expect, it } from "vitest";
import {
  allTopics,
  itemsForTopic,
  postsForProject,
  projectsForPost,
} from "./relations";

const posts = [
  { slug: "p1", tags: ["go", "writing"], projects: ["ledger"] },
  { slug: "p2", tags: ["rust"], projects: [] },
];
const projects = [
  { slug: "ledger", stack: ["go", "postgres"] },
  { slug: "pulse", stack: ["rust"] },
];

describe("relations", () => {
  it("links posts and projects both ways", () => {
    expect(postsForProject(posts, "ledger").map((p) => p.slug)).toEqual(["p1"]);
    expect(projectsForPost(projects, posts[0]).map((p) => p.slug)).toEqual([
      "ledger",
    ]);
    expect(projectsForPost(projects, posts[1])).toEqual([]);
  });

  it("merges post tags and project stacks into topics", () => {
    expect(allTopics(posts, projects)).toEqual([
      "go",
      "postgres",
      "rust",
      "writing",
    ]);
  });

  it("finds posts and projects for a topic", () => {
    const go = itemsForTopic("go", posts, projects);
    expect(go.posts.map((p) => p.slug)).toEqual(["p1"]);
    expect(go.projects.map((p) => p.slug)).toEqual(["ledger"]);
  });
});
