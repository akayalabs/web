"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/routing";
import { dur, ease, viewport } from "@/lib/motion-tokens";
import { HankoStamp } from "./ornaments/hanko-stamp";

export function ClosingCTA() {
  const t = useTranslations("closing");
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.once}
      transition={{ duration: dur.lg, ease: ease.brush }}
      className="relative my-28 grid items-center gap-10 rounded-sm border border-[color-mix(in_srgb,var(--color-brass)_30%,transparent)] bg-cream-deep px-10 py-16 sm:px-14 sm:py-20 lg:grid-cols-[1fr_auto]"
    >
      <div className="space-y-5 max-w-2xl">
        <span className="overline">{t("overline")}</span>
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">{t("title")}</h2>
        <p className="text-lg leading-relaxed text-sumi-soft">{t("body")}</p>
      </div>
      <div className="flex items-center gap-5">
        <HankoStamp size={48} />
        <Link
          href="/contact"
          className="inline-block bg-sumi px-7 py-4 text-sm tracking-wide text-cream transition hover:bg-sumi-soft"
        >
          {t("cta")} →
        </Link>
      </div>
    </motion.section>
  );
}
