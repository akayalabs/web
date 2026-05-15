import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akayalabs.com";
const PATHS = ["", "/products", "/about", "/about/vision", "/about/mission", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const path of PATHS) {
      out.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }
  return out;
}
