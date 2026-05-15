"use client";

import { motion } from "motion/react";
import { ease, dur, stagger, viewport } from "@/lib/motion-tokens";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
};

const container = (delay: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger.normal, delayChildren: delay } },
});

const word = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: dur.md, ease: ease.brush } },
};

export function WordStagger({ text, className, as: Tag = "h1", delay = 0 }: Props) {
  const MotionTag = motion[Tag] as typeof motion.h1;
  const words = text.split(" ");
  return (
    <MotionTag
      className={className}
      variants={container(delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport.once}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span key={`${w}-${i}`} variants={word} className="inline-block whitespace-pre">
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
