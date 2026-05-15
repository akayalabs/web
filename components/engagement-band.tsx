"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/routing";
import { ease, dur, viewport } from "@/lib/motion-tokens";

export function EngagementBand() {
  const t = useTranslations("engagement");
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.once}
      transition={{ duration: dur.lg, ease: ease.brush }}
      className="grid gap-8 rounded-sm border border-[color-mix(in_srgb,var(--color-brass)_25%,transparent)] bg-cream px-10 py-12 sm:px-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center"
    >
      <div className="space-y-4">
        <span className="overline">{t("overline")}</span>
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">{t("title")}</h2>
        <p className="max-w-2xl text-lg leading-relaxed text-sumi-soft">{t("body")}</p>
      </div>
      <Link
        href="/contact"
        className="inline-block self-start bg-sumi px-7 py-4 text-sm tracking-wide text-cream transition hover:bg-sumi-soft lg:self-center"
      >
        {t("cta")} →
      </Link>
    </motion.section>
  );
}
