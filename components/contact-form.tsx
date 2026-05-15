"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { submitContact, type ContactState } from "@/app/[locale]/contact/actions";
import { dur, ease } from "@/lib/motion-tokens";

const INITIAL: ContactState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, action] = useActionState(submitContact, INITIAL);

  if (state.status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur.md, ease: ease.stamp }}
        className="rounded-sm border border-brass bg-cream-deep p-6 font-mincho text-sumi"
      >
        {t("success")}
      </motion.div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-7">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0" aria-hidden />
      <Field name="name" label={t("field.name")} type="text" error={fieldError(state, "name", t)} required />
      <Field name="email" label={t("field.email")} type="email" error={fieldError(state, "email", t)} required />
      <Field name="subject" label={t("field.subject")} type="text" error={fieldError(state, "subject", t)} required />
      <TextArea name="message" label={t("field.message")} error={fieldError(state, "message", t)} required />
      {state.status === "error" && state.code === "rate_limit" && (
        <p className="text-sm text-crimson">{t("error_rate_limit")}</p>
      )}
      {state.status === "error" && state.code === "generic" && (
        <p className="text-sm text-crimson">{t("error_generic")}</p>
      )}
      <SubmitButton />
    </form>
  );
}

function fieldError(state: ContactState, key: "name" | "email" | "subject" | "message", t: ReturnType<typeof useTranslations<"contact">>): string | undefined {
  if (state.status !== "error" || !state.fieldErrors) return undefined;
  const code = state.fieldErrors[key];
  if (!code) return undefined;
  return t(`validation.${code}` as `validation.${typeof code}`);
}

function Field({ name, label, type, error, required }: { name: string; label: string; type: string; error?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="overline">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="border-b border-[color-mix(in_srgb,var(--color-sumi)_25%,transparent)] bg-transparent py-2 outline-none transition focus:border-brass"
      />
      {error && <span className="text-xs text-crimson">{error}</span>}
    </label>
  );
}

function TextArea({ name, label, error, required }: { name: string; label: string; error?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="overline">{label}</span>
      <textarea
        name={name}
        rows={6}
        required={required}
        className="border-b border-[color-mix(in_srgb,var(--color-sumi)_25%,transparent)] bg-transparent py-2 outline-none transition focus:border-brass"
      />
      {error && <span className="text-xs text-crimson">{error}</span>}
    </label>
  );
}

function SubmitButton() {
  const t = useTranslations("contact");
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="self-start bg-sumi px-6 py-3 text-sm tracking-wide text-cream transition hover:bg-sumi-soft disabled:opacity-60"
    >
      {pending ? t("submitting") : t("submit")}
    </button>
  );
}
