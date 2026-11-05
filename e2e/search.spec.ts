import { expect, test } from "@playwright/test";
import { searchIndex } from "./helpers";

test("Ctrl+K opens search and Enter navigates to the match", async ({
  page,
  request,
}) => {
  const project = (await searchIndex(request)).find(
    (i) => i.kind === "project" || i.kind === "post",
  );
  test.skip(!project, "no posts or projects yet");

  await page.goto("/");
  await page.keyboard.press("Control+k");
  const input = page.getByPlaceholder("Search projects, posts and topics…");
  await expect(input).toBeVisible();
  await input.fill(project!.title);
  await expect(
    page.getByRole("option", { name: new RegExp(project!.title) }).first(),
  ).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${project!.href}$`));
});

test("the search index is served statically", async ({ request }) => {
  const items = await searchIndex(request);
  expect(items.some((i) => i.href === "/blog")).toBe(true);
});
