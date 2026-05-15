"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ease, dur, stagger, viewport } from "@/lib/motion-tokens";

const KEYS = ["team", "longterm", "quality"] as const;

export function ValuesBand() {
  const t = useTranslations("about.values");
  return (
    <motion.div
      className="mt-12 grid gap-10 border-y border-[color-mix(in_srgb,var(--color-brass)_22%,transparent)] py-10 sm:grid-cols-3 sm:gap-14"
      initial="hidden"
      whileInView="show"
      viewport={viewport.once}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.normal } } }}
    >
      {KEYS.map((k, i) => (
        <motion.div
          key={k}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: dur.md, ease: ease.brush } },
          }}
          className="flex flex-col gap-3"
        >
          <span className="font-mincho text-xs uppercase tracking-[0.32em] text-brass-deep">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl leading-tight text-sumi">{t(`items.${k}.title`)}</h3>
          <p className="leading-relaxed text-sumi-soft">{t(`items.${k}.body`)}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
