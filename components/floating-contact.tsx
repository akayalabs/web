"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/routing";

export function FloatingContact() {
  const t = useTranslations("nav");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 1.2 }}
      className="fixed bottom-6 right-6 z-30 sm:bottom-8 sm:right-8"
    >
      <Link
        href="/contact"
        className="group flex items-center gap-3 rounded-full bg-sumi px-5 py-3 text-sm font-medium tracking-wide text-cream shadow-[0_18px_40px_-18px_rgba(26,22,20,0.45)] transition hover:bg-brass hover:text-sumi"
        aria-label={t("cta_primary")}
      >
        <span aria-hidden className="text-base">✉</span>
        <span className="hidden sm:inline">{t("cta_primary")}</span>
      </Link>
    </motion.div>
  );
}
