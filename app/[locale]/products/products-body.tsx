"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { BrushDivider } from "@/components/ornaments/brush-divider";
import { HankoStamp } from "@/components/ornaments/hanko-stamp";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { WordStagger } from "@/components/motion/word-stagger";
import { SceneCurtain } from "@/components/motion/scene-curtain";
import { ClosingCTA } from "@/components/closing-cta";
import { products } from "@/lib/products";
import { ease, stagger, viewport, dur } from "@/lib/motion-tokens";

export function ProductsBody() {
  const t = useTranslations("products");
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
          <ScrollReveal as="p" className="mt-6 max-w-2xl text-lg leading-relaxed text-sumi-soft">
            {t("subtitle")}
          </ScrollReveal>
          <ScrollReveal
            as="p"
            delay={0.05}
            className="mt-6 max-w-2xl font-mincho text-lg leading-relaxed text-sumi"
          >
            {t("intro")}
          </ScrollReveal>
          <div className="my-12 flex items-center gap-6">
            <BrushDivider width={200} />
            <HankoStamp size={32} />
            <BrushDivider width={200} />
          </div>
          <motion.div
            className="grid grid-cols-1 gap-10 md:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={viewport.once}
            variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.slow } } }}
          >
            {products.map((p) => (
              <motion.article
                key={p.slug}
                id={p.slug}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: dur.md, ease: ease.brush } },
                }}
                className="group relative flex h-full scroll-mt-32 flex-col gap-6 rounded-sm border border-[color-mix(in_srgb,var(--color-brass)_25%,transparent)] bg-cream-deep/30 p-10 transition hover:bg-cream-deep hover:shadow-[0_24px_50px_-26px_rgba(184,137,61,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-3xl text-sumi sm:text-4xl">{t(`${p.slug}.name`)}</h2>
                  <span className="overline whitespace-nowrap">{t(`status.${p.status}`)}</span>
                </div>
                <p className="flex-1 font-mincho text-lg leading-relaxed text-sumi sm:text-xl">
                  {t(`${p.slug}.blurb`)}
                </p>
                <div className="flex items-center justify-between pt-4">
                  {p.status === "client" ? (
                    <span />
                  ) : p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mincho text-base text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
                    >
                      {t("visit")} →
                    </a>
                  ) : (
                    <span className="overline text-brass-deep">{t(`status.${p.status}`)}</span>
                  )}
                  <HankoStamp size={24} />
                </div>
              </motion.article>
            ))}
          </motion.div>
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
