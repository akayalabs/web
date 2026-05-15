"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, dur, viewport } from "@/lib/motion-tokens";

export function ScrollReveal({
  children,
  delay = 0,
  y = 12,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "p" | "header";
}) {
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.once}
      transition={{ duration: dur.md, delay, ease: ease.stamp }}
    >
      {children}
    </MotionTag>
  );
}
