import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";

const PATHS = ["/", "/products", "/about", "/about/vision", "/about/mission", "/contact"] as const;

// Ana sayfa en yüksek önceliği alır, derinleştikçe öncelik azalır.
const priorityOf = (path: string) => (path === "/" ? 1 : Math.max(0.5, 0.9 - 0.2 * (path.split("/").length - 2)));

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: localizedUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority: priorityOf(path),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
      },
    })),
  );
}
