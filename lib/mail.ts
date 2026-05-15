import nodemailer, { type Transporter } from "nodemailer";

export type ContactInput = { name: string; email: string; subject: string; message: string };
export type ContactEmail = { subject: string; text: string; replyTo: string };

export function buildContactEmail(input: ContactInput): ContactEmail {
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ];
  return { subject: `[akayalabs.com] ${input.subject}`, text: lines.join("\n"), replyTo: input.email };
}

let cachedTransporter: Transporter | null = null;

function required(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;
  const host = required("SMTP_HOST");
  const port = Number(required("SMTP_PORT"));
  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: required("SMTP_USER"), pass: required("SMTP_PASSWORD") },
  });
  return cachedTransporter;
}

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const built = buildContactEmail(input);
  await getTransporter().sendMail({
    from: `Akaya Labs <${required("SMTP_USER")}>`,
    to: required("CONTACT_TO"),
    replyTo: built.replyTo,
    subject: built.subject,
    text: built.text,
  });
}
