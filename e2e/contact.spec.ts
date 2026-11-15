import { expect, test } from "@playwright/test";
import { minFillMs } from "../src/lib/contact";

/**
 * The contact form. The server it runs against is started with CONTACT_DRY_RUN=1
 * (see playwright.config.ts), so a send is exercised end to end without emailing anything.
 */

test("an empty message is refused field by field", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Tell me who you are.")).toBeVisible();
  await expect(page.getByText("I need somewhere to reply.")).toBeVisible();
  await expect(
    page.getByText("Say a few words about what you need."),
  ).toBeVisible();
  await expect(page.getByLabel("Your name")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

test("a bad address is reported but the message is kept", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example");
  await page
    .getByLabel("Message")
    .fill("Writing about the AgentCore console work.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(
    page.getByText("That doesn’t look like an email address."),
  ).toBeVisible();
  await expect(page.getByLabel("Message")).toHaveValue(
    "Writing about the AgentCore console work.",
  );
});

test("a filled-in message is accepted and the form can be reused", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page
    .getByLabel("Message")
    .fill("Writing about the AgentCore console work, and a role on our team.");
  // Wait out the bot timing check, so this exercises the send rather than being filtered.
  await page.waitForTimeout(minFillMs);
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Message sent")).toBeVisible();

  await page.getByRole("button", { name: "Send another" }).click();
  await expect(page.getByLabel("Message")).toHaveValue("");
});

test("a message sent faster than a person could type asks for a retry", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page
    .getByLabel("Message")
    .fill("Submitted the instant the page loaded.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText(/send once more/)).toBeVisible();
  await expect(page.getByText("Message sent")).toHaveCount(0);

  // Sending again goes through: the message was never lost.
  await page.waitForTimeout(minFillMs);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Message sent")).toBeVisible();
});

test("the spam trap is hidden from people but present for bots", async ({
  page,
}) => {
  await page.goto("/contact");
  const trap = page.locator('input[name="message-id"]');

  await expect(trap).toBeAttached();
  await expect(trap).not.toBeVisible();
  await expect(trap).toHaveAttribute("tabindex", "-1");
});

test("a failed send is never reported as success", async ({ page }) => {
  await page.goto("/contact");
  // The action is a POST to the page's own URL; failing it stands in for an outage.
  await page.route("**/contact", (route) =>
    route.request().method() === "POST"
      ? route.abort("failed")
      : route.continue(),
  );

  await page.getByLabel("Your name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page
    .getByLabel("Message")
    .fill("Checking that an outage does not swallow the message.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Message sent")).toHaveCount(0);
  // The message is still there to retry, and the visitor is pointed at the address instead.
  await expect(page.getByText(/That didn’t send/)).toBeVisible();
  await expect(page.getByLabel("Message")).toHaveValue(
    "Checking that an outage does not swallow the message.",
  );
});
