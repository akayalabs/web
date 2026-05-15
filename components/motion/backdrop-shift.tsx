"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function BackdropShift() {
  const { scrollYProgress } = useScroll();
  const damped = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.6 });

  const background = useTransform(
    damped,
    [0, 0.2, 0.5, 0.85, 1],
    [
      "#FAF7F1", // cream — opening
      "#F8EEEA", // warm pearl
      "#F2DCD5", // sakura tint
      "#E8C9C0", // dusk
      "#F2EDE3", // back to cream-deep at the closing CTA
    ],
  );

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 -z-10 transition-colors"
    />
  );
}
