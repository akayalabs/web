import { describe, expect, it } from "vitest";
import { products, productSlugs, liveProducts, platformCount } from "@/lib/products";
import en from "@/messages/en.json";
import tr from "@/messages/tr.json";

describe("product catalogue", () => {
  it("lists the products in display order", () => {
    expect(productSlugs).toEqual([
      "coredence", "stoneye", "bytebye", "cleandev", "pulsewatch",
      "snapslim", "cleanlock", "hesaplyor", "away-kingdom", "cevre-sikayet",
    ]);
  });

  it("links Coredence to its own site", () => {
    const coredence = products.find((p) => p.slug === "coredence");
    expect(coredence?.status).toBe("live");
    expect(coredence?.url).toBe("https://coredence.com");
  });

  it("marks Çevre Şikâyet as client work with no url", () => {
    const cevre = products.find((p) => p.slug === "cevre-sikayet");
    expect(cevre?.status).toBe("client");
    expect(cevre?.url).toBeNull();
  });

  it("gives every live product a link", () => {
    for (const p of liveProducts) expect(p.url, p.slug).toMatch(/^https:\/\//);
  });

  it("derives the platform count from the catalogue", () => {
    expect(platformCount).toBe(new Set(products.flatMap((p) => p.platforms)).size);
  });

  it("has a name and blurb for every product in both languages", () => {
    for (const messages of [en, tr]) {
      const copy = messages.products as Record<string, unknown>;
      for (const slug of productSlugs) {
        expect(copy[slug], slug).toMatchObject({ name: expect.any(String), blurb: expect.any(String) });
      }
    }
  });
});
