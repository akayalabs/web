# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-form.spec.ts >> blocks empty submit with validation errors
- Location: tests/e2e/contact-form.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /^send$/i })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - img [ref=e4]
  - heading "This page couldn’t load" [level=1] [ref=e6]
  - paragraph [ref=e7]: Reload to try again, or go back.
  - generic [ref=e8]:
    - button "Reload" [ref=e10] [cursor=pointer]
    - button "Back" [ref=e11] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("blocks empty submit with validation errors", async ({ page }) => {
  4  |   await page.goto("/en/contact");
> 5  |   await page.getByRole("button", { name: /^send$/i }).click();
     |                                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  6  |   await expect(page.locator("text=Name is required.")).toBeVisible();
  7  |   await expect(page.locator("text=Enter a valid email.")).toBeVisible();
  8  | });
  9  | 
  10 | test("shows the success banner after a valid submit (SMTP env required)", async ({ page }) => {
  11 |   test.skip(!process.env.SMTP_HOST, "SMTP_HOST missing; skipping live submit smoke");
  12 |   await page.goto("/en/contact");
  13 |   await page.getByLabel("Your name").fill("Playwright Bot");
  14 |   await page.getByLabel("Email").fill("bot@example.com");
  15 |   await page.getByLabel("Subject").fill("Smoke test");
  16 |   await page.getByLabel("Your message").fill("This is an automated smoke test.");
  17 |   await page.getByRole("button", { name: /^send$/i }).click();
  18 |   await expect(page.locator("[role=status]")).toBeVisible();
  19 | });
  20 | 
```