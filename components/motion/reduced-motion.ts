"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}

// Sunucuda ve ilk boyamada animasyonu kapalı sayar; tarayıcı tercihi değişince abonelikle güncellenir.
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true,
  );
}
