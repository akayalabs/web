"use client";

import { motion } from "motion/react";
import { ease, dur, viewport } from "@/lib/motion-tokens";

export function BrushDivider({ width = 240, className }: { width?: number; className?: string }) {
  return (
    <motion.svg
      width={width}
      height={24}
      viewBox="0 0 240 24"
      aria-hidden
      className={className}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1, transition: { duration: dur.lg, ease: ease.brush } }}
      viewport={viewport.once}
      style={{ transformOrigin: "left center" }}
    >
      <defs>
        <linearGradient id="brush-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#D9B26A" stopOpacity="0" />
          <stop offset="20%" stopColor="#B8893D" />
          <stop offset="80%" stopColor="#8A6420" />
          <stop offset="100%" stopColor="#8A6420" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 8 14 C 60 6 120 18 180 10 C 200 8 220 16 232 12"
        fill="none"
        stroke="url(#brush-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#sumi-edge)"
      />
    </motion.svg>
  );
}
