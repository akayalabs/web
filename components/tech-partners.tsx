"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ease, dur, stagger, viewport } from "@/lib/motion-tokens";

const PARTNERS = [
  { name: "Apple", className: "font-display tracking-tight" },
  { name: "Microsoft", className: "font-sans font-semibold tracking-tight" },
  { name: "Google", className: "font-sans font-medium tracking-tight" },
  { name: "GitHub", className: "font-sans font-semibold tracking-tight" },
  { name: "Vercel", className: "font-sans font-bold tracking-tight" },
  { name: "Railway", className: "font-sans font-semibold tracking-tight" },
  { name: "Stripe", className: "font-sans font-bold tracking-tight" },
  { name: "Firebase", className: "font-sans font-medium tracking-tight" },
] as const;

export function TechPartners() {
  const t = useTranslations("partners");
  return (
    <section>
      <div className="flex items-baseline justify-between gap-6">
        <span className="overline">{t("overline")}</span>
        <span className="hidden text-sm text-sumi-soft sm:inline">{t("subtitle")}</span>
      </div>
      <motion.div
        className="mt-10 grid grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-4 lg:grid-cols-8"
        initial="hidden"
        whileInView="show"
        viewport={viewport.once}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.fast } } }}
      >
        {PARTNERS.map((p) => (
          <motion.span
            key={p.name}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: dur.sm, ease: ease.stamp } },
            }}
            className={`text-center text-lg text-sumi opacity-60 transition-opacity hover:opacity-100 sm:text-xl lg:text-2xl ${p.className}`}
          >
            {p.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
