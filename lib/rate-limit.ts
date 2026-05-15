export type RateLimit = { check: (key: string) => boolean };
type Bucket = { count: number; resetAt: number };

export function rateLimit(opts: { windowMs: number; max: number }): RateLimit {
  const buckets = new Map<string, Bucket>();
  return {
    check(key: string): boolean {
      const now = Date.now();
      const b = buckets.get(key);
      if (!b || b.resetAt <= now) {
        buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
        return true;
      }
      if (b.count >= opts.max) return false;
      b.count++;
      return true;
    },
  };
}

export const contactFormLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5 });
