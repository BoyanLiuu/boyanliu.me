import { expect, test } from "@playwright/test";

test("résumé short links redirect with ?ref=resume", async ({ request }) => {
  const home = await request.get("/r", { maxRedirects: 0 });
  expect(home.status()).toBe(307);
  expect(home.headers()["location"]).toBe("/?ref=resume");

  const project = await request.get("/p/some-project", { maxRedirects: 0 });
  expect(project.status()).toBe(307);
  expect(project.headers()["location"]).toBe(
    "/projects/some-project?ref=resume",
  );
});
