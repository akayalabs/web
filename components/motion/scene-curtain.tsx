"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, dur, viewport } from "@/lib/motion-tokens";

export function SceneCurtain({
  children,
  delay = 0,
  className,
  as: Tag = "section",
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "section" | "div" | "article";
  // İlk ekranda görünen bölümler için: sunucudan son haliyle gelir, JS beklemeden boyanır.
  // Aksi halde LCP öğesi hidrasyona kadar opacity 0'da kalıyor.
  eager?: boolean;
}) {
  const MotionTag = motion[Tag] as typeof motion.section;
  return (
    <MotionTag
      className={className}
      initial={eager ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.once}
      transition={{ duration: dur.md, delay, ease: ease.brush }}
    >
      {children}
    </MotionTag>
  );
}
