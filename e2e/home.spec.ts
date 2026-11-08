import { expect, test } from "@playwright/test";
import site from "../content/site.json" with { type: "json" };

/**
 * The recruiter "5-second test" (docs: guide §13.4): on a 1440×900 screen, before scrolling,
 * a visitor sees who this is, the role, availability, how to get the résumé and how to make contact.
 * The hero is roomy (like sudhanva.space), so the first project starts just below the fold:
 * it must begin within half a screen of it, directly after the hero.
 */
test.use({ viewport: { width: 1440, height: 900 } });

test("home passes the 5-second test above the fold", async ({ page }) => {
  await page.goto("/");
  const main = page.locator("main");

  const fold = async (locator: ReturnType<typeof page.locator>) => {
    await expect(locator).toBeVisible();
    const box = await locator.boundingBox();
    expect(box, "element has a box").not.toBeNull();
    expect(box!.y, "element starts above the fold").toBeLessThan(900);
  };

  await fold(main.getByRole("heading", { level: 1 }));
  if (site.author.availability !== "hidden")
    await fold(main.getByText(site.author.availabilityNote));
  await fold(
    main
      .getByRole("navigation", { name: "Contact" })
      .getByRole("link", { name: /Résumé/ }),
  );
  await fold(
    main
      .getByRole("navigation", { name: "Contact" })
      .getByRole("link", { name: /@|Email/ }),
  );
  const firstProject = await main
    .locator("#work article")
    .first()
    .boundingBox();
  expect(firstProject, "first project has a box").not.toBeNull();
  expect(
    firstProject!.y,
    "first project starts just below the fold",
  ).toBeLessThan(900 * 1.5);
});
