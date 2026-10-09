import { describe, expect, it } from "vitest";
import { products, productSlugs } from "@/lib/products";

describe("product catalogue", () => {
  it("contains the seven expected slugs in order", () => {
    expect(productSlugs).toEqual([
      "coredence", "pulsewatch", "snapslim", "cleanlock",
      "hesaplyor", "away-kingdom", "cevre-sikayet",
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
});
