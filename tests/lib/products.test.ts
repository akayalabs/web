import { describe, expect, it } from "vitest";
import { products, productSlugs } from "@/lib/products";

describe("product catalogue", () => {
  it("contains the six expected slugs in order", () => {
    expect(productSlugs).toEqual([
      "pulsewatch", "snapslim", "cleanlock",
      "hesaplyor", "away-kingdom", "cevre-sikayet",
    ]);
  });

  it("marks Çevre Şikâyet as client work with no url", () => {
    const cevre = products.find((p) => p.slug === "cevre-sikayet");
    expect(cevre?.status).toBe("client");
    expect(cevre?.url).toBeNull();
  });
});
