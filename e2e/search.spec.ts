import { expect, test } from "@playwright/test";

test("Ctrl+K opens search and Enter navigates to the match", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const input = page.getByPlaceholder("Search projects, posts and topics…");
  await expect(input).toBeVisible();
  await input.fill("ledgerline");
  await expect(
    page.getByRole("option", { name: /Ledgerline/ }).first(),
  ).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/ledgerline$/);
});

test("the search index is served statically", async ({ request }) => {
  const response = await request.get("/search.json");
  expect(response.ok()).toBe(true);
  const items = await response.json();
  expect(
    items.some((i: { href: string }) => i.href === "/blog/hello-world"),
  ).toBe(true);
});
