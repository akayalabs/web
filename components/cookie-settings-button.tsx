"use client";

import { withdrawConsent } from "@/lib/consent";

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={withdrawConsent}
      className="min-h-11 rounded-sm border border-sumi/20 px-4 py-2 text-sm text-sumi transition hover:bg-sumi/5"
    >
      {label}
    </button>
  );
}
