import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Hero } from "@/components/hero";
import { Capabilities } from "@/components/capabilities";
import { Process } from "@/components/process";
import { WhyUs } from "@/components/why-us";
import { ProductCard } from "@/components/product-card";
import { ClosingCTA } from "@/components/closing-cta";
import { SceneCurtain } from "@/components/motion/scene-curtain";
import { BrushDivider } from "@/components/ornaments/brush-divider";
import { HankoStamp } from "@/components/ornaments/hanko-stamp";
import { Marquee } from "@/components/marquee";
import { StatsBand } from "@/components/stats-band";
import { TechPartners } from "@/components/tech-partners";
import { buildMetadata } from "@/lib/seo";
import { products } from "@/lib/products";

const FEATURED = ["pulsewatch", "snapslim", "cleanlock"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale, pathname: "/" });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeBody locale={locale} />;
}

function HomeBody({ locale }: { locale: string }) {
  const t = useTranslations("home");
  return (
    <>
      <Hero />
      <Marquee />
      <SceneCurtain className="px-6 py-24 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <StatsBand locale={locale} />
        </div>
      </SceneCurtain>
      <SceneCurtain className="border-y border-[color-mix(in_srgb,var(--color-brass)_18%,transparent)] bg-cream-deep/30 px-6 py-20 sm:px-10 sm:py-24 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <TechPartners />
        </div>
      </SceneCurtain>
      <SceneCurtain className="bg-cream-deep/40 px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <Capabilities />
        </div>
      </SceneCurtain>
      <SceneCurtain className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <Process />
        </div>
      </SceneCurtain>
      <SceneCurtain className="bg-cream-deep/40 px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <WhyUs />
        </div>
      </SceneCurtain>
      <SceneCurtain className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <span className="overline">{t("featured_overline")}</span>
          <div className="my-10 flex items-center gap-6">
            <BrushDivider width={180} />
            <HankoStamp size={32} />
            <BrushDivider width={180} />
          </div>
          <div className="grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => (FEATURED as readonly string[]).includes(p.slug))
              .map((p) => (
                <div key={p.slug} className="h-full">
                  <ProductCard product={p} />
                </div>
              ))}
          </div>
          <Link
            href="/products"
            className="mt-12 inline-block text-sm font-medium text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
          >
            {t("featured_cta")} →
          </Link>
        </div>
      </SceneCurtain>
      <SceneCurtain className="bg-cream-deep/40 px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <ClosingCTA />
        </div>
      </SceneCurtain>
    </>
  );
}
