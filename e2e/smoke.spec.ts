import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1").first()).toBeVisible();
});

test("a post renders its title, code and math", async ({ page }) => {
  const response = await page.goto("/blog/markdown-style-guide");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: "Markdown style guide" }),
  ).toBeVisible();
  await expect(
    page.locator("[data-rehype-pretty-code-figure]").first(),
  ).toBeVisible();
  await expect(page.locator(".katex").first()).toBeVisible();
});

test("an unknown page returns 404", async ({ page }) => {
  const response = await page.goto("/blog/this-post-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});
