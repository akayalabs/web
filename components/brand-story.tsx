"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./motion/scroll-reveal";

export function BrandStory() {
  const t = useTranslations("about.story");
  return (
    <ScrollReveal as="section" className="mt-24">
      <span className="overline">{t("overline")}</span>
      <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">{t("title")}</h2>
      <div className="prose-editorial mt-10 max-w-2xl text-lg">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
      </div>
    </ScrollReveal>
  );
}
