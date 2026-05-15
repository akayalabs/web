import { expect, test } from "@playwright/test";

test("blocks empty submit with validation errors", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: /^send$/i }).click();
  await expect(page.locator("text=Name is required.")).toBeVisible();
  await expect(page.locator("text=Enter a valid email.")).toBeVisible();
});

test("shows the success banner after a valid submit (SMTP env required)", async ({ page }) => {
  test.skip(!process.env.SMTP_HOST, "SMTP_HOST missing; skipping live submit smoke");
  await page.goto("/en/contact");
  await page.getByLabel("Your name").fill("Playwright Bot");
  await page.getByLabel("Email").fill("bot@example.com");
  await page.getByLabel("Subject").fill("Smoke test");
  await page.getByLabel("Your message").fill("This is an automated smoke test.");
  await page.getByRole("button", { name: /^send$/i }).click();
  await expect(page.locator("[role=status]")).toBeVisible();
});
