"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

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
  const [visible, setVisible] = useState(false);
  const t = texts[locale === "tr" ? "tr" : "en"];

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
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
