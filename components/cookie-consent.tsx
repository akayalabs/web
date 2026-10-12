"use client";

import { useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";

const CONSENT_KEY = "cookie-consent";

// Tercih yalnızca bu bileşenin düğmeleriyle değişir; dışarıdan dinlenecek bir olay yok.
const noopSubscribe = () => () => {};

const texts = {
  tr: {
    message:
      "Bu site, deneyiminizi iyileştirmek ve trafiği analiz etmek için çerezler kullanır.",
    accept: "Kabul Et",
    reject: "Reddet",
  },
  en: {
    message:
      "This site uses cookies to enhance your experience and analyze traffic.",
    accept: "Accept",
    reject: "Decline",
  },
} as const;

declare global {
  interface Window {
    dataLayer: unknown[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

export function CookieConsent() {
  const locale = useLocale();
  // Kayıtlı tercih yoksa gösterilir; sunucuda gizli başlar ki hidrasyonda zıplama olmasın.
  const hasStoredChoice = useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem(CONSENT_KEY) !== null,
    () => true,
  );
  const [dismissed, setDismissed] = useState(false);
  const visible = !hasStoredChoice && !dismissed;
  const t = texts[locale === "tr" ? "tr" : "en"];

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setDismissed(true);
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setDismissed(true);
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-[color-mix(in_srgb,var(--color-brass-deep)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-cream)_95%,transparent)] px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4">
        <p className="min-w-[200px] flex-1 text-sm text-sumi/80">{t.message}</p>
        <div className="flex gap-2">
          <button
            onClick={reject}
            className="rounded-sm border border-sumi/20 px-4 py-2 text-sm text-sumi/70 transition hover:bg-sumi/5"
          >
            {t.reject}
          </button>
          <button
            onClick={accept}
            className="rounded-sm bg-crimson px-5 py-2 text-sm font-medium text-cream transition hover:bg-[color-mix(in_srgb,var(--color-crimson)_82%,#000)]"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
