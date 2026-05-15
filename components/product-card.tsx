"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import type { Product } from "@/lib/products";
import { Link } from "@/i18n/routing";
import { Tilt3D } from "./motion/tilt-3d";

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("products");
  const isClient = product.status === "client";

  return (
    <Tilt3D className="group h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative flex h-full flex-col gap-3 rounded-sm border border-transparent bg-cream-deep/40 p-7 transition hover:bg-cream-deep hover:shadow-[0_18px_40px_-22px_rgba(184,137,61,0.45)]"
      >
        <span
          aria-hidden
          className="absolute inset-x-7 top-0 h-px bg-[color-mix(in_srgb,var(--color-brass)_0%,transparent)] transition-all duration-500 group-hover:bg-[color-mix(in_srgb,var(--color-brass)_70%,transparent)]"
        />
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-2xl text-sumi">{t(`${product.slug}.name`)}</h3>
            <span
              aria-hidden
              className="block h-px w-0 origin-left bg-brass transition-all duration-500 ease-out group-hover:w-16"
            />
          </div>
          <span className="overline">{t(`status.${product.status}`)}</span>
        </div>
        <p className="flex-1 leading-relaxed text-sumi-soft">{t(`${product.slug}.blurb`)}</p>
        {isClient ? null : product.url ? (
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="self-start text-sm font-medium text-sumi underline decoration-brass underline-offset-4 transition group-hover:decoration-brass-deep"
          >
            {t("visit")}{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        ) : (
          <Link
            href={`/products#${product.slug}`}
            className="self-start text-sm font-medium text-sumi underline decoration-brass underline-offset-4 transition group-hover:decoration-brass-deep"
          >
            {t("detail")}{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </motion.article>
    </Tilt3D>
  );
}
