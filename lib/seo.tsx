import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akayalabs.com";

export async function buildMetadata(opts: {
  locale: string;
  pathname: string;
  titleKey?: string;
}): Promise<Metadata> {
  const tt = await getTranslations({ locale: opts.locale });
  const seoT = await getTranslations({ locale: opts.locale, namespace: "seo" });
  const titleBase = "Akaya Labs";
  const alternates: Record<string, string> = {};
  for (const l of routing.locales) {
    alternates[l] = `${SITE_URL}/${l}${opts.pathname === "/" ? "" : opts.pathname}`;
  }
  const title = opts.titleKey ? `${tt(opts.titleKey)} · ${titleBase}` : seoT("default_title");
  const description = seoT("default_description");
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
      locale: opts.locale,
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
    sameAs: ["https://linkedin.com/company/akayalabs", "https://github.com/akayalabs"],
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
