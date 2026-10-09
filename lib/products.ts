export type ProductStatus = "live" | "review" | "in_dev" | "client";

export type Platform = "ios" | "android" | "macos" | "web";

// schema.org SoftwareApplication.applicationCategory değerleri.
export type AppCategory =
  | "DeveloperApplication"
  | "UtilitiesApplication"
  | "EducationalApplication"
  | "BusinessApplication"
  | "GameApplication"
  | "LifestyleApplication";

export type Product = {
  slug:
    | "coredence"
    | "stoneye"
    | "bytebye"
    | "cleandev"
    | "pulsewatch"
    | "snapslim"
    | "cleanlock"
    | "hesaplyor"
    | "away-kingdom"
    | "cevre-sikayet";
  status: ProductStatus;
  // Ürünün kendi sitesi; yoksa mağaza sayfası.
  url: string | null;
  appStoreUrl: string | null;
  platforms: readonly Platform[];
  category: AppCategory;
};

const appStore = (slug: string, id: string) => `https://apps.apple.com/app/${slug}/id${id}`;

export const products: readonly Product[] = [
  {
    slug: "coredence",
    status: "live",
    url: "https://coredence.com",
    appStoreUrl: null,
    platforms: ["macos"],
    category: "DeveloperApplication",
  },
  {
    slug: "stoneye",
    status: "live",
    url: "https://stoneye.app",
    appStoreUrl: appStore("stoneye", "6810726333"),
    platforms: ["ios"],
    category: "EducationalApplication",
  },
  {
    slug: "bytebye",
    status: "live",
    url: "https://bytebye.app",
    appStoreUrl: appStore("bytebye", "6810312972"),
    platforms: ["ios"],
    category: "UtilitiesApplication",
  },
  {
    slug: "cleandev",
    status: "live",
    url: "https://cleandev.app",
    appStoreUrl: appStore("cleandev-lite", "6815269089"),
    platforms: ["macos"],
    category: "DeveloperApplication",
  },
  {
    slug: "pulsewatch",
    status: "live",
    url: "https://pulsewatch.watch",
    appStoreUrl: null,
    platforms: ["web"],
    category: "BusinessApplication",
  },
  {
    slug: "snapslim",
    status: "live",
    url: appStore("snapslim-file-compressor", "6760120190"),
    appStoreUrl: appStore("snapslim-file-compressor", "6760120190"),
    platforms: ["ios"],
    category: "UtilitiesApplication",
  },
  {
    slug: "cleanlock",
    status: "live",
    url: "https://cleanlock.app",
    appStoreUrl: appStore("cleanlock-lock-clean", "6760240690"),
    platforms: ["macos"],
    category: "UtilitiesApplication",
  },
  {
    slug: "hesaplyor",
    status: "live",
    url: "https://hesaplyor.com",
    appStoreUrl: null,
    platforms: ["web"],
    category: "LifestyleApplication",
  },
  {
    slug: "away-kingdom",
    status: "in_dev",
    url: null,
    appStoreUrl: null,
    platforms: ["ios", "android"],
    category: "GameApplication",
  },
  {
    slug: "cevre-sikayet",
    status: "client",
    url: null,
    appStoreUrl: null,
    platforms: ["ios", "android", "web"],
    category: "BusinessApplication",
  },
] as const;

export const productSlugs = products.map((p) => p.slug);

export const liveProducts = products.filter((p) => p.status === "live");

export const platformCount = new Set(products.flatMap((p) => p.platforms)).size;
