"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ease, dur, viewport } from "@/lib/motion-tokens";

export function EnsoBrush({ size = 360, className }: { size?: number; className?: string }) {
  const ta = useTranslations("a11y");
  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={viewport.once}
      transition={{ duration: dur.xl, ease: ease.brush }}
    >
      <Image
        src="/brand/logo-mark.png"
        alt={ta("logo_mark")}
        width={size}
        height={size}
        priority
        className="h-full w-full object-contain"
      />
    </motion.div>
  );
}
