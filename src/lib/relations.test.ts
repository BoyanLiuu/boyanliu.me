import { describe, expect, it } from "vitest";
import {
  adjacent,
  allTopics,
  itemsForTopic,
  postsForProject,
  projectsForPost,
  relatedPosts,
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

describe("relatedPosts and adjacent", () => {
  const list = [
    { slug: "a", tags: ["go", "kafka"] },
    { slug: "b", tags: ["rust"] },
    { slug: "c", tags: ["go"] },
    { slug: "d", tags: ["go", "kafka", "aws"] },
  ];

  it("ranks by shared tags and excludes the post itself and unrelated posts", () => {
    expect(relatedPosts(list[0], list).map((p) => p.slug)).toEqual(["d", "c"]);
  });

  it("finds newer and older neighbours", () => {
    expect(adjacent(list, "a")).toEqual({ newer: undefined, older: list[1] });
    expect(adjacent(list, "c")).toEqual({ newer: list[1], older: list[3] });
    expect(adjacent(list, "zzz")).toEqual({
      newer: undefined,
      older: undefined,
    });
  });
});
