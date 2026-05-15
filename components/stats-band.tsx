"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";

const STATS = [
  { value: 6, suffix: "", label_tr: "yayında ürün", label_en: "shipped products" },
  { value: 9, suffix: "", label_tr: "destekli dil", label_en: "supported languages" },
  { value: 4, suffix: "", label_tr: "platform", label_en: "platforms" },
  { value: 100, suffix: "%", label_tr: "tek elden", label_en: "single-team" },
] as const;

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on("change", (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv, rounded, to]);

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

export function StatsBand({ locale }: { locale: string }) {
  return (
    <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-14">
      {STATS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
          <span className="font-display text-5xl text-sumi sm:text-6xl lg:text-7xl">
            <CountUp to={s.value} suffix={s.suffix} />
          </span>
          <span className="overline">{locale === "tr" ? s.label_tr : s.label_en}</span>
        </motion.div>
      ))}
    </div>
  );
}
