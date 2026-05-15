import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { Manifesto } from "@/components/manifesto";
import { BrandStory } from "@/components/brand-story";
import { Founder } from "@/components/founder";
import { ValuesBand } from "@/components/values-band";
import { Approach } from "@/components/approach";
import { VisionMission } from "@/components/vision-mission";
import { WordStagger } from "@/components/motion/word-stagger";
import { SceneCurtain } from "@/components/motion/scene-curtain";
import { ClosingCTA } from "@/components/closing-cta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale, pathname: "/about", titleKey: "about.title" });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutBody />;
}

function AboutBody() {
  const t = useTranslations("about");
  return (
    <>
      <SceneCurtain as="section" className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1800px]">
          <span className="overline">{t("title")}</span>
          <WordStagger
            as="h1"
            text={t("title")}
            className="mt-4 font-display text-5xl tracking-tight sm:text-6xl lg:text-7xl"
          />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sumi-soft">{t("intro")}</p>
          <ValuesBand />
          <VisionMission />
          <SceneCurtain as="div" className="mt-16">
            <Manifesto />
            <BrandStory />
            <Approach />
            <Founder />
          </SceneCurtain>
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
