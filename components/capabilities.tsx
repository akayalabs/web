"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ease, dur, stagger, viewport } from "@/lib/motion-tokens";
import { BrushDivider } from "./ornaments/brush-divider";
import { HankoStamp } from "./ornaments/hanko-stamp";

const KEYS = ["site", "ecommerce", "app", "mobile", "systems", "desktop"] as const;

function CapabilityIcon({ k }: { k: string }) {
  const stroke = "var(--color-brass-deep)";
  const common = {
    stroke,
    strokeWidth: 1.5,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (k) {
    case "site":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...common} aria-hidden>
          <rect x="4" y="6" width="28" height="22" rx="2" />
          <path d="M4 12h28" />
          <circle cx="8" cy="9" r="0.8" fill={stroke} />
          <circle cx="11" cy="9" r="0.8" fill={stroke} />
          <circle cx="14" cy="9" r="0.8" fill={stroke} />
        </svg>
      );
    case "ecommerce":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...common} aria-hidden>
          <path d="M8 12h20l-2 16H10z" />
          <path d="M14 12V8a4 4 0 018 0v4" />
        </svg>
      );
    case "app":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...common} aria-hidden>
          <rect x="5" y="8" width="20" height="14" rx="1.5" />
          <rect x="11" y="14" width="20" height="14" rx="1.5" />
        </svg>
      );
    case "mobile":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...common} aria-hidden>
          <rect x="12" y="4" width="14" height="28" rx="2.5" />
          <path d="M17 28h4" />
        </svg>
      );
    case "systems":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...common} aria-hidden>
          <circle cx="8" cy="8" r="3" />
          <circle cx="28" cy="10" r="3" />
          <circle cx="18" cy="26" r="3" />
          <path d="M10.5 9.5l5 14M25.5 12L20 24M11 8h14" />
        </svg>
      );
    case "desktop":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...common} aria-hidden>
          <rect x="4" y="6" width="28" height="18" rx="1.5" />
          <path d="M14 24v4h8v-4M10 28h16" />
        </svg>
      );
    default:
      return null;
  }
}

export function Capabilities() {
  const t = useTranslations("capabilities");
  return (
    <section className="py-24 sm:py-32">
      <span className="overline">{t("overline")}</span>
      <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
        {t("title")}
      </h2>
      <div className="my-10 flex items-center gap-6">
        <BrushDivider width={180} />
        <HankoStamp size={32} />
        <BrushDivider width={180} />
      </div>
      <motion.div
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
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
            className="flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--color-brass)_35%,transparent)] pt-6"
          >
            <div className="flex items-center justify-between">
              <CapabilityIcon k={k} />
              <span className="font-display text-base tracking-[0.18em] text-brass-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <span className="font-mincho text-xl tracking-tight text-brass-deep">
              {t(`items.${k}.tag`)}
            </span>
            <h3 className="font-display text-2xl text-sumi">{t(`items.${k}.title`)}</h3>
            <p className="leading-relaxed text-sumi-soft">{t(`items.${k}.body`)}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
