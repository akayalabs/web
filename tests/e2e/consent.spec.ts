import { expect, test } from "@playwright/test";

const GA_SCRIPT = /googletagmanager\.com\/gtag\/js/;

function watchAnalytics(page: import("@playwright/test").Page) {
  const seen = { requested: false };
  page.on("request", (req) => {
    if (GA_SCRIPT.test(req.url())) seen.requested = true;
  });
  return seen;
}

test("Analytics stays unloaded until consent is given", async ({ page }) => {
  const seen = watchAnalytics(page);
  await page.goto("/tr");
  await expect(page.getByRole("button", { name: "Kabul Et" })).toBeVisible();
  await page.waitForTimeout(1500);
  expect(seen.requested).toBe(false);
});

test("rejecting keeps Analytics unloaded", async ({ page }) => {
  const seen = watchAnalytics(page);
  await page.goto("/tr");
  await page.getByRole("button", { name: "Reddet" }).click();
  await page.waitForTimeout(1000);
  expect(seen.requested).toBe(false);
});

test("accepting loads Analytics and the privacy page can withdraw it", async ({ page }) => {
  const seen = watchAnalytics(page);
  await page.goto("/tr");
  await page.getByRole("button", { name: "Kabul Et" }).click();
  await expect.poll(() => seen.requested).toBe(true);

  await page.goto("/tr/privacy");
  await page.getByRole("button", { name: "Çerez tercihimi değiştir" }).click();
  await expect(page.getByRole("button", { name: "Kabul Et" })).toBeVisible();
});
