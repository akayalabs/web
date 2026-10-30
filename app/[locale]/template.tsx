"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    // Sarmalayıcı opacity ile gizli başlarsa sayfadaki her öğenin boyanması hidrasyonu bekler; LCP'yi bu uzatıyordu.
    <motion.div
      initial={{ y: 14 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
