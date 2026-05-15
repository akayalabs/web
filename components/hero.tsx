"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Link } from "@/i18n/routing";
import { MagneticButton } from "./motion/magnetic-button";
import { HankoStamp } from "./ornaments/hanko-stamp";
import { ease, dur } from "@/lib/motion-tokens";

const CAPABILITY_KEYS = ["site", "ecommerce", "app", "mobile", "systems", "desktop"] as const;

export function Hero() {
  const t = useTranslations("hero");
  const ct = useTranslations("capabilities");
  const et = useTranslations("engagement");

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.6 });
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(((e.clientX - cx) / cx) * 8);
      my.set(((e.clientY - cy) / cy) * 6);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section className="relative isolate overflow-hidden px-6 pt-8 pb-20 sm:px-10 sm:pt-12 sm:pb-28 lg:px-16 xl:px-24">
      <div className="relative mx-auto w-full max-w-[1800px]">
        {/* TOP OVERLINE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.sm, ease: ease.stamp }}
          className="flex items-center justify-between"
        >
          <span className="overline">{t("overline")}</span>
          <span className="overline hidden text-sumi-soft sm:inline">
            № 01 · MMXXVI
          </span>
        </motion.div>

        {/* MASTHEAD — balanced 6/6, side-by-side, vertical-center, generous gap */}
        <div className="mt-2 grid grid-cols-12 items-center gap-10 sm:mt-4 lg:gap-20">
          {/* Wordmark lockup (left, 6/12) */}
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: dur.xl, ease: ease.brush, delay: 0.1 }}
          >
            <h1 className="sr-only">{t("title")}</h1>
            <Image
              src="/brand/wordmark-tech.png"
              alt="akaya"
              width={1600}
              height={1600}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 90vw, 640px"
              className="block h-auto w-full max-w-[640px] object-contain object-left"
            />
          </motion.div>

          {/* Logo mark (right, 5/12) — balanced size */}
          <motion.div
            style={{ x: sx, y: sy }}
            className="col-span-12 lg:col-span-5 lg:justify-self-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: dur.xl, ease: ease.brush, delay: 0.25 }}
              className="relative aspect-square w-[78vw] max-w-[520px] lg:w-[520px]"
            >
              <Image
                src="/brand/logo-mark.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 78vw, 520px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* HAIRLINE RULE */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: dur.lg, delay: 0.6, ease: ease.brush }}
          style={{ transformOrigin: "left center" }}
          className="mt-16"
        >
          <div className="h-px w-full bg-[color-mix(in_srgb,var(--color-brass)_30%,transparent)]" />
        </motion.div>

        {/* MULTI-COLUMN EDITORIAL GRID — 12 col, split 5/4/3 */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.lg, delay: 0.75, ease: ease.brush }}
          className="mt-12 grid grid-cols-12 gap-8 lg:gap-14"
        >
          {/* Col 1 — Lede (5/12) */}
          <div className="col-span-12 md:col-span-7 lg:col-span-5">
            <p className="font-mincho text-2xl leading-snug text-sumi sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]">
              {t("tagline")}
            </p>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-sumi-soft sm:text-lg">
              {t("intro")}
            </p>
          </div>

          {/* Col 2 — Capability index (4/12) */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <span className="overline">{ct("overline")}</span>
            <ul className="mt-5 divide-y divide-[color-mix(in_srgb,var(--color-brass)_22%,transparent)]">
              {CAPABILITY_KEYS.map((k, i) => (
                <li key={k} className="flex items-baseline gap-4 py-3">
                  <span className="font-mincho text-sm text-brass-deep tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="overline text-brass-deep">{ct(`items.${k}.tag`)}</span>
                    <span className="font-display text-lg leading-tight text-sumi">
                      {ct(`items.${k}.title`)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Engagement CTA (3/12) */}
          <div className="col-span-12 md:col-span-12 lg:col-span-3">
            <span className="overline">{et("overline")}</span>
            <h2 className="mt-4 font-display text-2xl leading-tight text-sumi sm:text-3xl">
              {t("cta_primary")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-sumi-soft">
              {et("body")}
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <MagneticButton
                href="/contact"
                className="inline-block bg-sumi px-5 py-3 text-center text-sm tracking-wide text-cream transition hover:bg-sumi-soft"
              >
                {et("cta")} →
              </MagneticButton>
              <Link
                href="/products"
                className="font-mincho text-sm text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
              >
                {t("cta_secondary")}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* FOOTER SIGIL ROW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.md, delay: 1.1, ease: ease.brush }}
          className="mt-16 flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <HankoStamp size={36} />
            <span className="font-mincho text-xs uppercase tracking-[0.32em] text-brass-deep">
              {t("overline").split("·")[0].trim()}
            </span>
          </div>
          <div className="hidden gap-6 sm:flex">
            {CAPABILITY_KEYS.map((k) => (
              <span key={k} className="overline text-brass-deep">
                {ct(`items.${k}.tag`)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
