"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ease, dur, stagger, viewport } from "@/lib/motion-tokens";
import { HankoStamp } from "./ornaments/hanko-stamp";

const ITEMS = ["single_team", "ownership", "long_term"] as const;

export function WhyUs() {
  const t = useTranslations("why");
  return (
    <section>
      <div className="flex items-center gap-5">
        <HankoStamp size={48} />
        <span className="overline">{t("overline")}</span>
      </div>
      <h2 className="mt-6 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">{t("title")}</h2>
      <motion.div
        className="mt-14 grid gap-12 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={viewport.once}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.normal } } }}
      >
        {ITEMS.map((k) => (
          <motion.article
            key={k}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: dur.md, ease: ease.brush } },
            }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-display text-2xl text-sumi">{t(`items.${k}.title`)}</h3>
            <p className="leading-relaxed text-sumi-soft">{t(`items.${k}.body`)}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
