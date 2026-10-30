"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { readConsent, saveConsent, subscribeConsent } from "@/lib/consent";

const texts = {
  tr: {
    message:
      "Siteyi nasıl kullandığınızı ölçmek için Google Analytics çerezleri kullanmak istiyoruz. Bu ölçüm verileri Google'ın yurt dışındaki sunucularına aktarılır. Kabul ederseniz bu işleme açık rıza vermiş olursunuz; reddederseniz Analytics hiç yüklenmez.",
    privacy: "Aydınlatma metni",
    accept: "Kabul Et",
    reject: "Reddet",
  },
  en: {
    message:
      "We would like to use Google Analytics cookies to measure how the site is used. This measurement data is transferred to Google's servers abroad. Accepting gives your explicit consent to this; if you decline, Analytics is not loaded at all.",
    privacy: "Privacy notice",
    accept: "Accept",
    reject: "Decline",
  },
} as const;

export function CookieConsent() {
  const locale = useLocale();
  // Kayıtlı tercih yoksa gösterilir; sunucuda gizli başlar ki hidrasyonda zıplama olmasın.
  const hasStoredChoice = useSyncExternalStore(
    subscribeConsent,
    () => readConsent() !== null,
    () => true,
  );
  const visible = !hasStoredChoice;
  const t = texts[locale === "tr" ? "tr" : "en"];

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-[color-mix(in_srgb,var(--color-brass-deep)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-cream)_95%,transparent)] px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4">
        <p className="min-w-[200px] flex-1 text-sm text-sumi/80">
          {t.message}{" "}
          <Link href="/privacy" className="underline decoration-brass underline-offset-4">{t.privacy}</Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => saveConsent("rejected")}
            className="rounded-sm border border-sumi/20 min-h-11 px-4 py-2 text-sm text-sumi/70 transition hover:bg-sumi/5"
          >
            {t.reject}
          </button>
          <button
            onClick={() => saveConsent("accepted")}
            className="rounded-sm bg-crimson min-h-11 px-5 py-2 text-sm font-medium text-cream transition hover:bg-[color-mix(in_srgb,var(--color-crimson)_82%,#000)]"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
