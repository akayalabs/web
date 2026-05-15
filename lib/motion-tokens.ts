import type { Easing } from "motion/react";

export const ease = {
  stamp: [0.2, 0.8, 0.2, 1] as const,
  brush: [0.65, 0, 0.35, 1] as const,
  linear: "linear" as Easing,
} as const;

export const dur = {
  xs: 0.2,
  sm: 0.4,
  md: 0.6,
  lg: 1.2,
  xl: 1.8,
} as const;

export const stagger = {
  fast: 0.04,
  normal: 0.08,
  slow: 0.16,
} as const;

export const viewport = {
  once: { once: true, margin: "0px 0px -10% 0px" },
} as const;
