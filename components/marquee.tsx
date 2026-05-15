"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";

const SERVICES_TR = [
  "Web Sitesi",
  "E-Ticaret Sistemi",
  "Mobil Uygulama",
  "Web Uygulaması",
  "Yönetim Sistemi",
  "Masaüstü Uygulaması",
  "B2B Çözümleri",
  "Kurumsal Yazılım",
  "Bakım ve Destek",
  "Özel Geliştirme",
] as const;

const SERVICES_EN = [
  "Website",
  "E-commerce System",
  "Mobile Application",
  "Web Application",
  "Management System",
  "Desktop Application",
  "B2B Solutions",
  "Corporate Software",
  "Maintenance & Support",
  "Custom Development",
] as const;

export function Marquee() {
  const locale = useLocale();
  const list = locale === "tr" ? SERVICES_TR : SERVICES_EN;
  const items = [...list, ...list];
  return (
    <div aria-hidden className="relative w-full overflow-hidden border-y border-[color-mix(in_srgb,var(--color-brass)_22%,transparent)] bg-cream-deep/60 py-5">
      <motion.div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="font-mincho text-2xl text-sumi-soft sm:text-3xl lg:text-4xl">
            {t} <span className="mx-6 text-brass-deep">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
