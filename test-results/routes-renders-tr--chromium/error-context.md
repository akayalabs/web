# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: routes.spec.ts >> renders tr/
- Location: tests/e2e/routes.spec.ts:8:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('header a').filter({ hasText: 'Akaya Labs' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('header a').filter({ hasText: 'Akaya Labs' })

```

```yaml
- img
- heading "This page couldn’t load" [level=1]
- paragraph: Reload to try again, or go back.
- button "Reload"
- button "Back"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | const ROUTES = ["", "/products", "/about", "/contact"];
  4  | const LOCALES = ["tr", "en"];
  5  | 
  6  | for (const locale of LOCALES) {
  7  |   for (const route of ROUTES) {
  8  |     test(`renders ${locale}${route || "/"}`, async ({ page }) => {
  9  |       const url = `/${locale}${route}`;
  10 |       const res = await page.goto(url);
  11 |       expect(res?.ok(), `expected 200 for ${url}`).toBe(true);
> 12 |       await expect(page.locator("header a", { hasText: "Akaya Labs" })).toBeVisible();
     |                                                                         ^ Error: expect(locator).toBeVisible() failed
  13 |       await expect(page.locator("footer")).toContainText("Akaya Labs");
  14 |     });
  15 |   }
  16 | }
  17 | 
  18 | test("locale switcher swaps language without losing path", async ({ page }) => {
  19 |   await page.goto("/tr/products");
  20 |   await page.getByRole("button", { name: /switch to en/i }).click();
  21 |   await expect(page).toHaveURL(/\/en\/products$/);
  22 | });
  23 | 
```