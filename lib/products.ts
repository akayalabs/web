export type ProductStatus = "live" | "review" | "in_dev" | "client";

export type Platform = "ios" | "android" | "macos" | "windows" | "web";

// Dile göre değişmeyen özel adlar; kartlarda ve JSON-LD'de aynı kaynaktan okunur.
export const PLATFORM_LABEL: Record<Platform, string> = {
  ios: "iOS",
  android: "Android",
  macos: "macOS",
  windows: "Windows",
  web: "Web",
};

// schema.org SoftwareApplication.applicationCategory değerleri.
export type AppCategory =
  | "DeveloperApplication"
  | "UtilitiesApplication"
  | "EducationalApplication"
  | "BusinessApplication"
  | "GameApplication"
  | "HealthApplication"
  | "LifestyleApplication";

export type Product = {
  slug:
    | "coredence"
    | "stoneye"
    | "bytebye"
    | "cleandev"
    | "patchkit"
    | "pulsewatch"
    | "snapslim"
    | "cleanlock"
    | "hesaplyor"
    | "away-kingdom"
    | "kinetude"
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
    platforms: ["macos", "windows"],
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
    slug: "patchkit",
    status: "live",
    url: "https://patchkit.app",
    appStoreUrl: appStore("patchkit", "6760600346"),
    platforms: ["web", "ios"],
    category: "BusinessApplication",
  },
  {
    slug: "pulsewatch",
    status: "live",
    url: "https://pulsewatch.watch",
    appStoreUrl: appStore("pulsewatch-web-monitor", "6759724594"),
    platforms: ["web", "ios"],
    category: "BusinessApplication",
  },
  {
    slug: "snapslim",
    status: "live",
    url: "https://snapslim.app",
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
    status: "live",
    url: "https://awaykingdom.com",
    appStoreUrl: appStore("away-kingdom", "6790325775"),
    platforms: ["ios"],
    category: "GameApplication",
  },
  {
    // Mağaza sayfası açılana kadar yayında sayılmaz; açılınca status ve appStoreUrl güncellenir.
    slug: "kinetude",
    status: "in_dev",
    url: "https://kinetude.com",
    appStoreUrl: null,
    platforms: ["ios"],
    category: "HealthApplication",
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

// Ürün sitesinin yanında mağaza bağlantısı ayrıca gösterilir; site zaten mağaza sayfasıysa tekrar edilmez.
export function storeLink(p: Product): { href: string; label: string } | null {
  if (!p.appStoreUrl || p.appStoreUrl === p.url) return null;
  const macOnly = p.platforms.includes("macos") && !p.platforms.includes("ios");
  return { href: p.appStoreUrl, label: macOnly ? "Mac App Store" : "App Store" };
}

export const productSlugs = products.map((p) => p.slug);

export const liveProducts = products.filter((p) => p.status === "live");

export const platformCount = new Set(products.flatMap((p) => p.platforms)).size;
