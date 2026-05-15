import "../globals.css";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { inter, playfair, mincho } from "@/lib/fonts";
import { MotionShell } from "@/components/motion/motion-config";
import { AmbientBlobs } from "@/components/motion/ambient-blobs";
import { SumiFilter } from "@/components/ornaments/sumi-filter";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SakuraDrift } from "@/components/motion/sakura-drift";
import { OrganizationSchema } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${mincho.variable}`}>
      <body className="grain relative min-h-screen bg-transparent text-sumi antialiased">
        <OrganizationSchema locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <MotionShell>
            <AmbientBlobs />
            <SumiFilter />
            <SakuraDrift count={6} />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </MotionShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
