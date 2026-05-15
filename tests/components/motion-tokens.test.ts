import { describe, expect, it } from "vitest";
import { ease, dur, stagger, viewport } from "@/lib/motion-tokens";

describe("motion tokens", () => {
  it("exposes named easings with bezier tuples", () => {
    expect(ease.stamp).toEqual([0.2, 0.8, 0.2, 1]);
    expect(ease.brush).toEqual([0.65, 0, 0.35, 1]);
  });

  it("durations stay under 2s for any single transition", () => {
    for (const v of Object.values(dur)) expect(v).toBeLessThanOrEqual(2);
  });

  it("stagger is monotonic", () => {
    expect(stagger.fast).toBeLessThan(stagger.normal);
    expect(stagger.normal).toBeLessThan(stagger.slow);
  });

  it("viewport.once is the canonical config", () => {
    expect(viewport.once).toEqual({ once: true, margin: "0px 0px -10% 0px" });
  });
});
