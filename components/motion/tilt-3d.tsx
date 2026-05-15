"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotionSafe } from "./reduced-motion";

export function Tilt3D({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(x, [-50, 50], [-6, 6]), { stiffness: 120, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 100);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 100);
  }
  function reset() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={`will-change-transform ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
