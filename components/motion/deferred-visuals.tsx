"use client";

import dynamic from "next/dynamic";

const SakuraDrift = dynamic(
  () => import("./sakura-drift").then((m) => ({ default: m.SakuraDrift })),
  { ssr: false, loading: () => null },
);

const AnimatedFavicon = dynamic(
  () => import("../animated-favicon").then((m) => ({ default: m.AnimatedFavicon })),
  { ssr: false, loading: () => null },
);

export function DeferredVisuals() {
  return (
    <>
      <SakuraDrift count={6} />
      <AnimatedFavicon />
    </>
  );
}
