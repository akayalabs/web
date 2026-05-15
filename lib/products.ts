export type ProductStatus = "live" | "review" | "in_dev" | "client";

export type Product = {
  slug: "pulsewatch" | "snapslim" | "cleanlock" | "hesaplyor" | "away-kingdom" | "cevre-sikayet";
  status: ProductStatus;
  url: string | null;
};

export const products: readonly Product[] = [
  { slug: "pulsewatch",    status: "live",   url: "https://pulsewatch.watch" },
  { slug: "snapslim",      status: "live",   url: null },
  { slug: "cleanlock",     status: "review", url: null },
  { slug: "hesaplyor",     status: "live",   url: "https://hesaplyor.com" },
  { slug: "away-kingdom",  status: "in_dev", url: null },
  { slug: "cevre-sikayet", status: "client", url: null },
] as const;

export const productSlugs = products.map((p) => p.slug);
