import { expect, test } from "@playwright/test";
import { searchIndex } from "./helpers";

test("home page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1").first()).toBeVisible();
});

test("every listed post and project page renders its title", async ({
  page,
  request,
}) => {
  const items = (await searchIndex(request)).filter(
    (i) => i.kind === "post" || i.kind === "project",
  );
  expect(items.length).toBeGreaterThan(0);
  for (const item of items) {
    const response = await page.goto(item.href);
    expect(response?.status(), item.href).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      item.title,
    );
  }
});

test("code blocks in posts are syntax highlighted", async ({
  page,
  request,
}) => {
  const posts = (await searchIndex(request)).filter((i) => i.kind === "post");
  let checked = false;
  for (const post of posts) {
    await page.goto(post.href);
    const figure = page.locator("[data-rehype-pretty-code-figure]").first();
    if ((await figure.count()) === 0) continue;
    await expect(figure).toBeVisible();
    // Shiki colours tokens with inline CSS variables, one per theme.
    await expect(
      figure.locator("span[style*='--shiki']").first(),
    ).toBeAttached();
    checked = true;
    break;
  }
  test.skip(!checked, "no published post has a code block");
});

test("an unknown page returns 404", async ({ page }) => {
  const response = await page.goto("/blog/this-post-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});

test("résumé page and PDF are available", async ({ page, request }) => {
  const response = await page.goto("/resume");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("link", { name: /Download PDF/ }),
  ).toHaveAttribute("href", "/resume.pdf");

  const pdf = await request.get("/resume.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect(pdf.headers()["content-disposition"]).toMatch(
    /filename=".+-Resume\.pdf"/,
  );
});
