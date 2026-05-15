import { expect, test } from "@playwright/test";

const ROUTES = ["", "/products", "/about", "/contact"];
const LOCALES = ["tr", "en"];

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    test(`renders ${locale}${route || "/"}`, async ({ page }) => {
      const url = `/${locale}${route}`;
      const res = await page.goto(url);
      expect(res?.ok(), `expected 200 for ${url}`).toBe(true);
      await expect(page.locator("header a", { hasText: "Akaya Labs" })).toBeVisible();
      await expect(page.locator("footer")).toContainText("Akaya Labs");
    });
  }
}

test("locale switcher swaps language without losing path", async ({ page }) => {
  await page.goto("/tr/products");
  await page.getByRole("button", { name: /switch to en/i }).click();
  await expect(page).toHaveURL(/\/en\/products$/);
});
