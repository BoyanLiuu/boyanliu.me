import { expect, test } from "@playwright/test";
import data from "../content/bookmarks.json" with { type: "json" };

test("bookmark links are external and safe", async ({ page }) => {
  await page.goto("/bookmarks");
  const first = data.bookmarks[0];
  const link = page
    .getByRole("link", { name: new RegExp(first.title) })
    .first();
  await expect(link).toHaveAttribute("href", first.url);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
});

test("pager reaches every bookmark, 10 per page", async ({ page }) => {
  await page.goto("/bookmarks");
  const seen = new Set<string>();
  const list = page.locator('section a[target="_blank"]');
  for (;;) {
    const hrefs = await list.evaluateAll((links) =>
      links.map((a) => a.getAttribute("href") ?? ""),
    );
    expect(hrefs.length).toBeLessThanOrEqual(10);
    hrefs.forEach((href) => seen.add(href));
    const next = page.getByRole("button", { name: "Next page" });
    if ((await next.count()) === 0) break;
    await next.click();
  }
  expect([...seen].sort()).toEqual(data.bookmarks.map((b) => b.url).sort());
});

test("kind filter narrows the list", async ({ page }) => {
  await page.goto("/bookmarks");
  const kind = data.bookmarks[0].kind;
  const others = data.bookmarks.filter((b) => b.kind !== kind);
  test.skip(others.length === 0, "only one kind of bookmark");
  await page
    .getByRole("button", { name: new RegExp(`^${kind}s`, "i") })
    .click();
  await expect(page.locator(`a[href="${others[0].url}"]`)).toHaveCount(0);
  await page.getByRole("button", { name: /^All/ }).click();
  await expect(
    page.locator(`a[href="${others[0].url}"]`).first(),
  ).toBeAttached();
});

test("home shows the latest bookmarks", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#bookmarks")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "All bookmarks →" }),
  ).toHaveAttribute("href", "/bookmarks");
});
