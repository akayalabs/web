"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { cubicBezier, motion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion-tokens";

const stampEase = cubicBezier(...(ease.stamp as unknown as [number, number, number, number]));

export function StickyScale({
  children,
  from = 0.88,
  to = 1,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, from], { ease: stampEase });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <div className="sticky top-24">
        <motion.div style={{ scale, opacity }} className="will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
