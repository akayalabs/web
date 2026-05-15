# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: routes.spec.ts >> locale switcher swaps language without losing path
- Location: tests/e2e/routes.spec.ts:18:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/en\/products$/
Received string:  "http://localhost:3000/tr/products"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://localhost:3000/tr/products"

```

```yaml
- banner:
  - link "Akaya Labs":
    - /url: /tr
  - navigation:
    - link "Ürünler":
      - /url: /tr/products
    - link "Hakkında":
      - /url: /tr/about
    - link "İletişim":
      - /url: /tr/contact
    - button "Switch to EN": English
- main:
  - text: Ürünler
  - heading "Ürünler" [level=1]
  - paragraph: Tek çatı altında altı ürün. Bir kısmı yayında, bir kısmı yolda, biri bir müşteriye ait.
  - article:
    - heading "PulseWatch" [level=3]
    - text: Yayında
    - paragraph: watchOS uyku takibi, native HealthKit entegrasyonu — temel özellikler için abonelik yok.
    - link "İncele →":
      - /url: https://pulsewatch.watch
  - article:
    - heading "SnapSlim" [level=3]
    - text: Yayında
    - paragraph: iOS için fotoğraf sıkıştırma. Küçük dosyalar, aynı görünüm — her şey cihazda.
  - article:
    - heading "CleanLock" [level=3]
    - text: App Store inceleme
    - paragraph: macOS odak yardımcısı — çalışırken dikkat dağıtıcıları sessizce engeller.
  - article:
    - heading "hesaplyor.com" [level=3]
    - text: Yayında
    - paragraph: Gündelik hesaplar için büyüyen, ücretsiz hesaplayıcı koleksiyonu.
    - link "İncele →":
      - /url: https://hesaplyor.com
  - article:
    - heading "Away Kingdom" [level=3]
    - text: Geliştirme aşamasında
    - paragraph: Klan kuran mobil bir oyun — prototip aktif geliştirmede.
  - article:
    - heading "Çevre Şikâyet" [level=3]
    - text: Müşteri işi · teslim edildi
    - paragraph: Belediye şikâyet platformu. Bir müşteri için frontend, backend ve mobil uygulamayı baştan sona ben teslim ettim — IP müşterinin.
    - text: Sözleşmeyle
- contentinfo:
  - text: Akaya Labs Rize, Türkiye
  - link "info@akayalabs.com":
    - /url: mailto:info@akayalabs.com
  - text: Bağlantılar
  - link "LinkedIn":
    - /url: https://linkedin.com/company/akayalabs
  - link "GitHub":
    - /url: https://github.com/akayalabs
  - text: © 2026 Akaya Labs
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
  12 |       await expect(page.locator("header a", { hasText: "Akaya Labs" })).toBeVisible();
  13 |       await expect(page.locator("footer")).toContainText("Akaya Labs");
  14 |     });
  15 |   }
  16 | }
  17 | 
  18 | test("locale switcher swaps language without losing path", async ({ page }) => {
  19 |   await page.goto("/tr/products");
  20 |   await page.getByRole("button", { name: /switch to en/i }).click();
> 21 |   await expect(page).toHaveURL(/\/en\/products$/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  22 | });
  23 | 
```