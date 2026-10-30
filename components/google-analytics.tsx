"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent } from "@/lib/consent";

const GA_ID = "G-4C9M76B6N8";

declare global {
  interface Window {
    dataLayer: unknown[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

// KVKK ilke kararı 2026/347: rıza, veri işlenmeye başlamadan önce alınır. Betik onaydan önce hiç yüklenmez.
export function GoogleAnalytics() {
  const accepted = useSyncExternalStore(
    subscribeConsent,
    () => readConsent() === "accepted",
    () => false,
  );
  if (!accepted) return null;

  return (
    <>
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `,
        }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
