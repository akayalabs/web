import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/mail", () => ({ sendContactEmail: vi.fn().mockResolvedValue(undefined) }));
vi.mock("@/lib/rate-limit", () => ({
  contactFormLimiter: { check: vi.fn().mockReturnValue(true) },
}));
vi.mock("next/headers", () => ({
  headers: () => Promise.resolve(new Map([["x-forwarded-for", "1.2.3.4"]])),
}));

import { submitContact, type ContactState } from "@/app/[locale]/contact/actions";
import { sendContactEmail } from "@/lib/mail";
import { contactFormLimiter } from "@/lib/rate-limit";

const initial: ContactState = { status: "idle" };

function fd(values: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.append(k, v);
  return f;
}

beforeEach(() => {
  (sendContactEmail as any).mockClear();
  (contactFormLimiter.check as any).mockReset().mockReturnValue(true);
});

describe("submitContact", () => {
  it("returns validation errors when fields are bad", async () => {
    const out = await submitContact(initial, fd({ name: "", email: "x", subject: "ok", message: "hi", website: "" }));
    expect(out.status).toBe("error");
    if (out.status === "error") {
      expect(out.fieldErrors?.name).toBeDefined();
      expect(out.fieldErrors?.email).toBeDefined();
      expect(out.fieldErrors?.message).toBeDefined();
    }
    expect(sendContactEmail).not.toHaveBeenCalled();
  });
  it("silently succeeds on honeypot trip without sending", async () => {
    const out = await submitContact(initial, fd({ name: "Ahmet", email: "a@b.co", subject: "Hi", message: "ten char min", website: "spam" }));
    expect(out.status).toBe("success");
    expect(sendContactEmail).not.toHaveBeenCalled();
  });
  it("blocks when rate limit is exceeded", async () => {
    (contactFormLimiter.check as any).mockReturnValue(false);
    const out = await submitContact(initial, fd({ name: "Ahmet", email: "a@b.co", subject: "Hi", message: "ten char min", website: "" }));
    expect(out.status).toBe("error");
    if (out.status === "error") expect(out.code).toBe("rate_limit");
    expect(sendContactEmail).not.toHaveBeenCalled();
  });
  it("sends the email on a valid submit", async () => {
    const out = await submitContact(initial, fd({ name: "Ahmet", email: "a@b.co", subject: "Hi", message: "ten char min!!", website: "" }));
    expect(out.status).toBe("success");
    expect(sendContactEmail).toHaveBeenCalledWith({ name: "Ahmet", email: "a@b.co", subject: "Hi", message: "ten char min!!" });
  });
});
