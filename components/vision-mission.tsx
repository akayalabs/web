"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ease, dur, viewport } from "@/lib/motion-tokens";
import { Link } from "@/i18n/routing";
import { HankoStamp } from "./ornaments/hanko-stamp";

export function VisionMission() {
  const t = useTranslations("about");
  const td = useTranslations("products");
  return (
    <section className="mt-24 grid gap-12 lg:grid-cols-2 lg:gap-16">
      <motion.article
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport.once}
        transition={{ duration: dur.lg, ease: ease.brush }}
        className="group relative flex flex-col gap-5 rounded-sm border border-[color-mix(in_srgb,var(--color-brass)_25%,transparent)] bg-cream-deep/40 p-10 transition hover:bg-cream-deep hover:shadow-[0_24px_50px_-26px_rgba(184,137,61,0.4)] sm:p-12"
      >
        <div className="flex items-center gap-4">
          <HankoStamp size={32} />
          <span className="overline">{t("vision.overline")}</span>
        </div>
        <h3 className="font-display text-2xl leading-tight text-sumi sm:text-3xl lg:text-4xl">{t("vision.title")}</h3>
        <p className="flex-1 text-base leading-relaxed text-sumi-soft sm:text-lg">{t("vision.lede")}</p>
        <Link
          href="/about/vision"
          className="mt-4 self-start text-sm font-medium text-sumi underline decoration-brass underline-offset-4 transition hover:decoration-brass-deep"
        >
          {td("detail")} →
        </Link>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport.once}
        transition={{ duration: dur.lg, delay: 0.1, ease: ease.brush }}
        className="group relative flex flex-col gap-5 rounded-sm border border-[color-mix(in_srgb,var(--color-brass)_25%,transparent)] bg-cream-deep/40 p-10 transition hover:bg-cream-deep hover:shadow-[0_24px_50px_-26px_rgba(184,137,61,0.4)] sm:p-12"
      >
        <div className="flex items-center gap-4">
          <HankoStamp size={32} />
          <span className="overline">{t("mission.overline")}</span>
        </div>
        <h3 className="font-display text-2xl leading-tight text-sumi sm:text-3xl lg:text-4xl">{t("mission.title")}</h3>
        <p className="flex-1 text-base leading-relaxed text-sumi-soft sm:text-lg">{t("mission.lede")}</p>
        <Link
          href="/about/mission"
          className="mt-4 self-start text-sm font-medium text-sumi underline decoration-brass underline-offset-4 transition hover:decoration-brass-deep"
        >
          {td("detail")} →
        </Link>
      </motion.article>
    </section>
  );
}
