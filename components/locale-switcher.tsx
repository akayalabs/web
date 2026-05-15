"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === "tr" ? "en" : "tr";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: next })}
      className="overline transition hover:text-sumi"
      aria-label={`Switch to ${next.toUpperCase()}`}
    >
      {t("switch")}
    </button>
  );
}
