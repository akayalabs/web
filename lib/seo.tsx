import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { products, type Platform } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akayalabs.com";

// Open Graph locale'i dil-bölge biçiminde ister (tr → tr_TR).
const OG_LOCALES: Record<string, string> = { tr: "tr_TR", en: "en_US" };

export type PageKey = "products" | "about" | "vision" | "mission" | "contact";

export function localizedUrl(locale: string, pathname: string) {
  return `${SITE_URL}/${locale}${pathname === "/" ? "" : pathname}`;
}

export async function buildMetadata(opts: {
  locale: string;
  pathname: string;
  titleKey?: string;
  // Verilmezse ana sayfa açıklaması kullanılır; her alt sayfa kendi açıklamasını taşımalı.
  page?: PageKey;
  descriptionValues?: Record<string, string>;
}): Promise<Metadata> {
  const tt = await getTranslations({ locale: opts.locale });
  const seoT = await getTranslations({ locale: opts.locale, namespace: "seo" });
  const titleBase = "Akaya Labs";
  const alternates: Record<string, string> = {};
  for (const l of routing.locales) {
    alternates[l] = localizedUrl(l, opts.pathname);
  }
  const title = opts.titleKey ? `${tt(opts.titleKey)} · ${titleBase}` : seoT("default_title");
  const description = opts.page
    ? seoT(`pages.${opts.page}`, opts.descriptionValues)
    : seoT("default_description");
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: seoT("keywords").split(",").map((k) => k.trim()),
    alternates: {
      canonical: alternates[opts.locale],
      languages: { ...alternates, "x-default": alternates[routing.defaultLocale] },
    },
    openGraph: {
      type: "website",
      url: alternates[opts.locale],
      siteName: titleBase,
      locale: OG_LOCALES[opts.locale] ?? opts.locale,
      alternateLocale: routing.locales.filter((l) => l !== opts.locale).map((l) => OG_LOCALES[l] ?? l),
      title,
      description,
      images: [{ url: "/brand/og-default.png", width: 1200, height: 630, alt: titleBase }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/brand/og-default.png"] },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
    robots: { index: true, follow: true },
  };
}

export function OrganizationSchema({ locale }: { locale: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Akaya Labs",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-mark.png`,
    description:
      locale === "tr"
        ? "Bağımsız yazılım stüdyosu. Web sitesi, mobil uygulama, B2B SaaS ve macOS uygulamaları."
        : "Independent software studio. Websites, mobile apps, B2B SaaS and macOS utilities.",
    sameAs: [
      "https://linkedin.com/company/akayalabs",
      "https://github.com/akayalabs",
      "https://instagram.com/akayalabs",
    ],
    address: { "@type": "PostalAddress", addressLocality: "Rize", addressCountry: "TR" },
    email: "info@akayalabs.com",
    foundingDate: "2026",
    knowsAbout: [
      "Web development",
      "Mobile application development",
      "SaaS",
      "B2B platforms",
      "macOS applications",
    ],
  };
  return <JsonLd data={json} />;
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Ürünler sayfası: her ürün kendi sitesine bağlı bir SoftwareApplication olarak listelenir.
// Müşteri işleri ve henüz yayınlanmamış ürünler arama sonuçlarına uygulama olarak girmez.
export async function ProductsSchema({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "products" });
  const listed = products.filter((p) => p.status === "live" && p.url);
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    url: localizedUrl(locale, "/products"),
    numberOfItems: listed.length,
    itemListElement: listed.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: t(`${p.slug}.name`),
        description: t(`${p.slug}.blurb`),
        url: p.url,
        ...(p.appStoreUrl && p.appStoreUrl !== p.url ? { sameAs: [p.appStoreUrl] } : {}),
        applicationCategory: p.category,
        operatingSystem: p.platforms.map((pl) => PLATFORM_OS[pl]).join(", "),
        author: { "@type": "Organization", name: "Akaya Labs", url: SITE_URL },
      },
    })),
  };
  return <JsonLd data={data} />;
}

const PLATFORM_OS: Record<Platform, string> = {
  ios: "iOS",
  android: "Android",
  macos: "macOS",
  web: "Web",
};

// Alt sayfalar için ekmek kırıntısı; Google arama sonucunda URL yerine yol gösterir.
export async function BreadcrumbSchema({
  locale,
  trail,
}: {
  locale: string;
  trail: readonly { pathname: string; titleKey: string }[];
}) {
  const t = await getTranslations({ locale });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const items = [{ name: nav("home"), url: localizedUrl(locale, "/") }].concat(
    trail.map((c) => ({ name: t(c.titleKey), url: localizedUrl(locale, c.pathname) })),
  );
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
  };
  return <JsonLd data={data} />;
}

// Ürünler sayfasının meta açıklaması yayındaki ürün adlarından üretilir; liste değişince açıklama da değişir.
export async function liveProductNames(locale: string) {
  const t = await getTranslations({ locale, namespace: "products" });
  const names = products.filter((p) => p.status === "live").map((p) => t(`${p.slug}.name`));
  return new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(names);
}
