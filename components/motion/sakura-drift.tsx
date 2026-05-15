"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { SakuraPetal } from "../ornaments/sakura-petal";

type Seed = { left: number; size: number; delay: number; dur: number; sway: number };

function buildSeeds(count: number): Seed[] {
  const seeds: Seed[] = [];
  for (let i = 0; i < count; i++) {
    const r = mulberry32(i + 1);
    seeds.push({
      left: r() * 100,
      size: 14 + r() * 16,
      delay: r() * -30,
      dur: 45 + r() * 35,
      sway: 30 + r() * 60,
    });
  }
  return seeds;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function SakuraDrift({ count = 8 }: { count?: number }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setActive(!mql.matches);
    const handler = (e: MediaQueryListEvent) => setActive(!e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  const seeds = useMemo(() => (active ? buildSeeds(count) : []), [active, count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden motion-reduce:hidden">
      {seeds.map((s, i) => (
        <motion.span
          key={i}
          className="absolute -top-12 opacity-70"
          style={{ left: `${s.left}%`, width: s.size, height: s.size }}
          initial={{ y: "-10vh", x: 0, rotate: 0 }}
          animate={{ y: "110vh", x: [0, s.sway, -s.sway, 0], rotate: [0, 180, 360] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "linear" }}
        >
          <SakuraPetal size={s.size} />
        </motion.span>
      ))}
    </div>
  );
}
