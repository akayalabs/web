import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildContactEmail, sendContactEmail } from "@/lib/mail";

const sendMail = vi.fn();
vi.mock("nodemailer", () => ({
  default: { createTransport: () => ({ sendMail }) },
  createTransport: () => ({ sendMail }),
}));

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue({ messageId: "test-id" });
  process.env = {
    ...ORIGINAL_ENV,
    SMTP_HOST: "smtp.gmail.com",
    SMTP_PORT: "465",
    SMTP_USER: "info@akayalabs.com",
    SMTP_PASSWORD: "app-password",
    CONTACT_TO: "info@akayalabs.com",
  };
});

afterEach(() => { process.env = ORIGINAL_ENV; });

describe("buildContactEmail", () => {
  it("renders subject and text including all fields", () => {
    const built = buildContactEmail({ name: "Ahmet", email: "a@example.com", subject: "Hello", message: "Lorem ipsum dolor sit amet" });
    expect(built.subject).toBe("[akayalabs.com] Hello");
    expect(built.text).toContain("Ahmet");
    expect(built.text).toContain("a@example.com");
    expect(built.text).toContain("Lorem ipsum dolor sit amet");
    expect(built.replyTo).toBe("a@example.com");
  });
});

describe("sendContactEmail", () => {
  it("calls the transporter with env routing", async () => {
    await sendContactEmail({ name: "A", email: "a@b.co", subject: "S", message: "hello world!!" });
    expect(sendMail).toHaveBeenCalledOnce();
    const args = sendMail.mock.calls[0][0];
    expect(args.from).toContain("info@akayalabs.com");
    expect(args.to).toBe("info@akayalabs.com");
    expect(args.replyTo).toBe("a@b.co");
  });
});
