"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ease, dur, stagger, viewport } from "@/lib/motion-tokens";
import { BrushDivider } from "./ornaments/brush-divider";

const KEYS = ["partnership", "scope", "communication", "ownership"] as const;

export function Approach() {
  const t = useTranslations("about.approach");
  return (
    <section className="mt-24">
      <span className="overline">{t("overline")}</span>
      <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">{t("title")}</h2>
      <BrushDivider className="my-10" width={220} />
      <motion.div
        className="grid gap-10 sm:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={viewport.once}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.normal } } }}
      >
        {KEYS.map((k, i) => (
          <motion.article
            key={k}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: dur.md, ease: ease.brush } },
            }}
            className="flex gap-6"
          >
            <span className="font-display text-4xl text-brass-deep">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-xl text-sumi sm:text-2xl">{t(`items.${k}.title`)}</h3>
              <p className="leading-relaxed text-sumi-soft">{t(`items.${k}.body`)}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
