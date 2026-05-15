import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/routing";
import { WordStagger } from "@/components/motion/word-stagger";
import { SceneCurtain } from "@/components/motion/scene-curtain";
import { ClosingCTA } from "@/components/closing-cta";
import { BrushDivider } from "@/components/ornaments/brush-divider";
import { HankoStamp } from "@/components/ornaments/hanko-stamp";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const SECTION_KEYS = ["scale", "longevity", "partnership", "discipline"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale, pathname: "/about/vision", titleKey: "about.vision.overline" });
}

export default async function VisionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VisionBody />;
}

function VisionBody() {
  const t = useTranslations("about.vision");
  const tn = useTranslations("nav");
  return (
    <>
      <SceneCurtain as="section" className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <Link href="/about" className="overline mb-6 inline-flex items-center gap-2 text-sumi-soft hover:text-sumi">
            ← {tn("about")}
          </Link>
          <span className="overline mt-4 block">{t("overline")}</span>
          <WordStagger
            as="h1"
            text={t("title")}
            className="mt-4 max-w-4xl font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl"
          />
          <ScrollReveal as="p" className="mt-8 max-w-3xl font-mincho text-2xl leading-snug text-sumi sm:text-3xl">
            {t("lede")}
          </ScrollReveal>
          <div className="my-14 flex items-center gap-6">
            <BrushDivider width={220} />
            <HankoStamp size={32} />
            <BrushDivider width={220} />
          </div>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {SECTION_KEYS.map((k, i) => (
              <ScrollReveal key={k} as="article" delay={i * 0.05} className="flex flex-col gap-4">
                <span className="font-mincho text-xs uppercase tracking-[0.32em] text-brass-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-2xl leading-tight text-sumi sm:text-3xl">
                  {t(`sections.${k}.heading`)}
                </h2>
                <p className="text-base leading-relaxed text-sumi-soft sm:text-lg">
                  {t(`sections.${k}.body`)}
                </p>
              </ScrollReveal>
            ))}
          </div>
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
