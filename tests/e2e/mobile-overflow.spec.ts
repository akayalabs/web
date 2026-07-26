import { expect, test } from "@playwright/test";

const ROUTES = ["", "/products", "/about", "/about/vision", "/about/mission", "/contact"];
const LOCALES = ["tr", "en"];

/** Narrowest phones we support (Galaxy S8 / iPhone SE / iPhone 12) up to a small tablet. */
const WIDTHS = [360, 375, 390, 768];

type Offender = { selector: string; right: number; text: string };

async function findOffenders(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out: Offender[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (rect.right <= vw + 1) continue;

      // Skip anything clipped by an ancestor with hidden overflow (marquees, blurred blobs).
      let clipped = false;
      for (let p = el.parentElement; p; p = p.parentElement) {
        const ov = getComputedStyle(p).overflowX;
        if (ov === "hidden" || ov === "clip" || ov === "auto" || ov === "scroll") {
          clipped = true;
          break;
        }
      }
      if (clipped) continue;

      out.push({
        selector: `${el.tagName.toLowerCase()}.${(el.getAttribute("class") ?? "").slice(0, 80)}`,
        right: Math.round(rect.right),
        text: (el.textContent ?? "").trim().slice(0, 40),
      });
    }
    return { vw, scrollWidth: document.documentElement.scrollWidth, out };
  });
}

for (const width of WIDTHS) {
  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      const url = `/${locale}${route}`;
      test(`no horizontal overflow at ${width}px — ${url}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(url);

        // Trigger every whileInView animation so late-mounted content is measured too.
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1500);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        const { vw, scrollWidth, out } = await findOffenders(page);

        expect(
          out,
          `elements wider than the ${vw}px viewport:\n${JSON.stringify(out, null, 2)}`,
        ).toEqual([]);
        expect(scrollWidth, `document scrolls horizontally at ${width}px`).toBeLessThanOrEqual(vw + 1);
      });
    }
  }
}

test("mobile menu opens, exposes every nav link and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/tr");

  const toggle = page.getByRole("button", { name: "Menüyü aç" });
  await expect(toggle).toBeVisible();
  await toggle.click();

  const panel = page.getByRole("dialog", { name: "Mobil menü" });
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("link", { name: "Ürünler" })).toBeVisible();
  await expect(panel.getByRole("link", { name: "Kurumsal" })).toBeVisible();
  await expect(panel.getByRole("button", { name: "English" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});

test("every content image carries alt text", async ({ page }) => {
  for (const locale of LOCALES) {
    await page.goto(`/${locale}`);
    const missing = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .filter((img) => !img.getAttribute("alt")?.trim())
        .map((img) => img.getAttribute("src") ?? "(no src)"),
    );
    expect(missing, `images without alt text on /${locale}`).toEqual([]);
  }
});
