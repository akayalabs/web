import "../globals.css";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale, type Messages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { inter, playfair, mincho } from "@/lib/fonts";
import { MotionShell } from "@/components/motion/motion-config";
import { AmbientBlobs } from "@/components/motion/ambient-blobs";
import { SumiFilter } from "@/components/ornaments/sumi-filter";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DeferredVisuals } from "@/components/motion/deferred-visuals";
import { OrganizationSchema } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { CookieConsent } from "@/components/cookie-consent";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// İstemci bileşenlerinin okuduğu bölümler. Metnin tamamı her sayfanın HTML'ine gömülüyordu.
// about yalnızca Hakkında sayfasında, o sayfanın kendi sağlayıcısıyla gönderilir.
const CLIENT_NAMESPACES = [
  "a11y", "nav", "hero", "capabilities", "engagement", "partners", "process", "why", "closing", "products", "contact",
] as const satisfies readonly (keyof Messages)[];

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((k) => [k, messages[k]]));

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${mincho.variable} overflow-x-clip`}>
      <head>
        {/* JavaScript'siz okurda giriş animasyonları hiç başlamaz; içerik gizli kalmasın. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="grain relative min-h-screen bg-transparent text-sumi antialiased">
        <OrganizationSchema locale={locale} />
        <NextIntlClientProvider messages={clientMessages}>
          <MotionShell>
            <AmbientBlobs />
            <SumiFilter />
            <DeferredVisuals />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </MotionShell>
          <CookieConsent />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
