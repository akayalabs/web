"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotionSafe } from "./reduced-motion";

export function MagneticButton({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  function onMove(e: React.PointerEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-12, Math.min(12, dx * 0.18)));
    y.set(Math.max(-12, Math.min(12, dy * 0.18)));
  }
  function reset() { x.set(0); y.set(0); }

  const style = reduced ? undefined : { x: sx, y: sy };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={style}
        className={className}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={style}
      className={className}
    >
      {children}
    </motion.button>
  );
}
