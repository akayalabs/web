import { describe, expect, it } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows up to `max` calls inside the window then blocks", () => {
    const rl = rateLimit({ windowMs: 1000, max: 3 });
    expect(rl.check("ip-a")).toBe(true);
    expect(rl.check("ip-a")).toBe(true);
    expect(rl.check("ip-a")).toBe(true);
    expect(rl.check("ip-a")).toBe(false);
  });
  it("tracks ips independently", () => {
    const rl = rateLimit({ windowMs: 1000, max: 1 });
    expect(rl.check("ip-a")).toBe(true);
    expect(rl.check("ip-b")).toBe(true);
    expect(rl.check("ip-a")).toBe(false);
  });
  it("resets after the window", async () => {
    const rl = rateLimit({ windowMs: 50, max: 1 });
    expect(rl.check("ip-c")).toBe(true);
    expect(rl.check("ip-c")).toBe(false);
    await new Promise((r) => setTimeout(r, 70));
    expect(rl.check("ip-c")).toBe(true);
  });
});
