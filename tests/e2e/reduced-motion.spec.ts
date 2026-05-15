import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test("with reduce-motion, sakura drift is hidden", async ({ page }) => {
  await page.goto("/en");
  const drift = page.locator("div[aria-hidden].fixed.inset-0");
  await expect(drift).toBeHidden();
});

test("with reduce-motion, hero title is fully visible immediately", async ({ page }) => {
  await page.goto("/en");
  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();
  const opacity = await h1.evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity)).toBeGreaterThan(0.9);
});
