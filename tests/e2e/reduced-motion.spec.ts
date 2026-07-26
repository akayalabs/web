import { expect, test } from "@playwright/test";

// Playwright >=1.60 moved the top-level `reducedMotion` option under `contextOptions`.
test.use({ contextOptions: { reducedMotion: "reduce" } });

test("with reduce-motion, sakura drift is hidden", async ({ page }) => {
  await page.goto("/en");
  // Scoped by test id — the ambient blob layer shares the same utility classes.
  await expect(page.getByTestId("sakura-drift")).toBeHidden();
});

test("with reduce-motion, hero title is fully visible immediately", async ({ page }) => {
  await page.goto("/en");
  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();
  const opacity = await h1.evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity)).toBeGreaterThan(0.9);
});
