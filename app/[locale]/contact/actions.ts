"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";
import { contactFormLimiter } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(1, "name_required"),
  email: z.string().email("email_invalid"),
  subject: z.string().min(1, "subject_required").max(200),
  message: z.string().min(10, "message_short").max(5000),
  website: z.string().optional(),
});

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      code: "validation" | "rate_limit" | "generic";
      fieldErrors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
    };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim(),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0];
      if (typeof k === "string") fieldErrors[k] = issue.message;
    }
    return { status: "error", code: "validation", fieldErrors };
  }
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: "success" };
  }

  const ip = await resolveIp();
  if (!contactFormLimiter.check(ip)) {
    return { status: "error", code: "rate_limit" };
  }

  try {
    await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
    return { status: "success" };
  } catch (err) {
    console.error("submitContact failed", err);
    return { status: "error", code: "generic" };
  }
}

async function resolveIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}
