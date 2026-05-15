"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Link, usePathname } from "@/i18n/routing";

const ITEMS = [
  { key: "about", href: "/about" },
  { key: "vision", href: "/about/vision" },
  { key: "mission", href: "/about/mission" },
] as const;

export function KurumsalDropdown() {
  const t = useTranslations("nav");
  const td = useTranslations("nav.dropdown");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on ESC.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside click.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm transition hover:text-brass-deep"
      >
        {t("about")}
        <span
          aria-hidden
          className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute left-0 top-full z-50 mt-2 w-[12rem] rounded-md border border-[color-mix(in_srgb,var(--color-brass)_22%,transparent)] bg-cream py-1.5 shadow-[0_20px_40px_-22px_rgba(26,22,20,0.22)]"
          >
            {ITEMS.map((it) => {
              const active = pathname === it.href;
              return (
                <Link
                  key={it.key}
                  href={it.href}
                  role="menuitem"
                  className={`block px-4 py-2 text-sm transition hover:bg-cream-deep/50 ${
                    active ? "text-brass-deep" : "text-sumi"
                  }`}
                >
                  {td(`${it.key}_label`)}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
