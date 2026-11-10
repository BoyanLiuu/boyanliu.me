import { expect, type Page, test } from "@playwright/test";

/** Runs `action` and returns the names of the view-transition groups that animated meanwhile. */
const morphedDuring = async (page: Page, action: () => Promise<unknown>) => {
  await page.evaluate(() => {
    const seen = new Set<string>();
    (window as unknown as { __morphed: Set<string> }).__morphed = seen;
    const start = performance.now();
    const tick = () => {
      for (const animation of document.getAnimations()) {
        const pseudo = (animation.effect as KeyframeEffect | null)
          ?.pseudoElement;
        const match = pseudo?.match(/^::view-transition-group\((.+)\)$/);
        if (match?.[1]) seen.add(match[1]);
      }
      if (performance.now() - start < 1500) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await action();
  await page.waitForTimeout(1600);
  return page.evaluate(() => [
    ...(window as unknown as { __morphed: Set<string> }).__morphed,
  ]);
};

const openFirstCaseStudy = async (page: Page) => {
  await page.goto("/");
  const link = page
    .locator("article.stack-card")
    .first()
    .getByRole("link", { name: /Read case study/ });
  const href = await link.getAttribute("href");
  const slug = href?.split("/").pop() ?? "";
  await link.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800); // let the reveal finish and the link prefetch
  const morphed = await morphedDuring(page, () => link.click());
  await expect(page).toHaveURL(new RegExp(`/projects/${slug}$`));
  return { slug, morphed };
};

test.describe("page transitions", () => {
  test("on desktop, a work card's cover and title morph into the case study", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const { slug, morphed } = await openFirstCaseStudy(page);
    expect(morphed).toEqual(
      expect.arrayContaining([
        `project-cover-${slug}`,
        `project-title-${slug}`,
      ]),
    );
  });

  test("on a phone, only the title morphs (the cover would land below the fold)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const { slug, morphed } = await openFirstCaseStudy(page);
    expect(morphed).toContain(`project-title-${slug}`);
    expect(morphed).not.toContain(`project-cover-${slug}`);
  });

  test("with reduced motion, nothing morphs", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    const { morphed } = await openFirstCaseStudy(page);
    // React may still add zero-length placeholders on the root; no shared element may animate.
    expect(morphed.filter((name) => name.startsWith("project-"))).toEqual([]);
  });
});
