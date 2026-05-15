"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, dur, viewport } from "@/lib/motion-tokens";

export function SceneCurtain({
  children,
  delay = 0,
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "section" | "div" | "article";
}) {
  const MotionTag = motion[Tag] as typeof motion.section;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.once}
      transition={{ duration: dur.md, delay, ease: ease.brush }}
    >
      {children}
    </MotionTag>
  );
}
