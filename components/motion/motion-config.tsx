"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

export function MotionShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.2, 0.8, 0.2, 1], duration: 0.6 }}>
      {children}
    </MotionConfig>
  );
}
