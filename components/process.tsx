"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ease, dur, stagger, viewport } from "@/lib/motion-tokens";
import { BrushDivider } from "./ornaments/brush-divider";

const STEPS = ["discovery", "plan", "build", "launch"] as const;

export function Process() {
  const t = useTranslations("process");
  return (
    <section>
      <span className="overline">{t("overline")}</span>
      <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">{t("title")}</h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sumi-soft">{t("subtitle")}</p>
      <BrushDivider className="my-12" width={220} />
      <motion.ol
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={viewport.once}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.normal } } }}
      >
        {STEPS.map((k) => (
          <motion.li
            key={k}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: dur.md, ease: ease.brush } },
            }}
            className="flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--color-brass)_35%,transparent)] pt-6"
          >
            <span className="font-mincho text-3xl text-brass-deep">{t(`steps.${k}.tag`)}</span>
            <h3 className="font-display text-2xl text-sumi">{t(`steps.${k}.title`)}</h3>
            <p className="leading-relaxed text-sumi-soft">{t(`steps.${k}.body`)}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
