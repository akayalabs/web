"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WordStagger } from "./motion/word-stagger";
import { EnsoBrush } from "./ornaments/enso-brush";

export function Manifesto() {
  const t = useTranslations("about.manifesto");
  return (
    <section className="relative">
      <div className="absolute -right-12 -top-16 hidden lg:block">
        <EnsoBrush size={280} className="opacity-25" />
      </div>
      <span className="overline">Manifesto</span>
      <WordStagger
        as="h2"
        text={t("lede")}
        className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl"
      />
      <div className="prose-editorial mt-10 max-w-2xl text-lg">
        <ScrollReveal as="p" delay={0}>{t("p1")}</ScrollReveal>
        <ScrollReveal as="p" delay={0.05}>{t("p2")}</ScrollReveal>
        <ScrollReveal as="p" delay={0.1}>{t("p3")}</ScrollReveal>
        <ScrollReveal as="p" delay={0.15} className="font-mincho text-sumi">{t("p4")}</ScrollReveal>
      </div>
    </section>
  );
}
