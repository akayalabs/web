"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { ease, dur } from "@/lib/motion-tokens";

const LINKS = [
  { key: "products", href: "/products" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const SUB_LINKS = [
  { key: "vision_label", href: "/about/vision" },
  { key: "mission_label", href: "/about/mission" },
] as const;

export function MobileMenu() {
  const t = useTranslations("nav");
  const td = useTranslations("nav.dropdown");
  const ta = useTranslations("a11y");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  // Storing the route the panel was opened on makes any navigation close it for free.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  // Close on ESC + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenedAt(null);
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? ta("menu_close") : ta("menu_open")}
        className="relative -mr-2 flex h-11 w-11 shrink-0 items-center justify-center"
      >
        <span aria-hidden className="flex w-6 flex-col items-end gap-[5px]">
          <motion.span
            className="block h-px w-6 bg-sumi"
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: dur.sm, ease: ease.stamp }}
          />
          <motion.span
            className="block h-px w-4 bg-sumi"
            animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
            transition={{ duration: dur.sm, ease: ease.stamp }}
          />
          <motion.span
            className="block h-px w-6 bg-sumi"
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: dur.sm, ease: ease.stamp }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label={ta("menu_label")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur.sm, ease: ease.stamp }}
            // Above the cookie consent bar (z-9999) — a modal dialog owns the top layer while open.
            className="fixed inset-0 z-[10000] flex flex-col overflow-y-auto overscroll-contain bg-cream px-6 pb-12 pt-7"
          >
            <div className="flex items-center justify-between">
              <span className="overline">{t("cta_primary")}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={ta("menu_close")}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl leading-none text-sumi"
              >
                <span aria-hidden>×</span>
              </button>
            </div>

            <nav className="mt-12 flex flex-col">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur.md, delay: 0.05 + i * 0.06, ease: ease.brush }}
                  className="border-b border-[color-mix(in_srgb,var(--color-brass)_20%,transparent)]"
                >
                  <Link
                    href={l.href}
                    className="block py-5 font-display text-3xl text-sumi"
                    onClick={() => setOpen(false)}
                  >
                    {t(l.key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur.md, delay: 0.25, ease: ease.brush }}
                className="mt-6 flex flex-col gap-4"
              >
                {SUB_LINKS.map((l) => (
                  <Link
                    key={l.key}
                    href={l.href}
                    className="font-mincho text-base text-sumi-soft"
                    onClick={() => setOpen(false)}
                  >
                    {td(l.key)}
                  </Link>
                ))}
              </motion.div>
            </nav>

            <div className="mt-auto flex flex-col gap-6 pt-14">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.replace(pathname, { locale: locale === "tr" ? "en" : "tr" });
                }}
                className="self-start overline"
              >
                {t("switch")}
              </button>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-sm bg-crimson px-5 py-3.5 text-center text-sm font-medium tracking-wide text-cream"
              >
                {t("cta_primary")} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
