import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";
import { BrushDivider } from "@/components/ornaments/brush-divider";
import { HankoStamp } from "@/components/ornaments/hanko-stamp";
import { WordStagger } from "@/components/motion/word-stagger";
import { SceneCurtain } from "@/components/motion/scene-curtain";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale, pathname: "/contact", titleKey: "contact.title" });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactBody />;
}

function ContactBody() {
  const t = useTranslations("contact");
  const ts = useTranslations("contact.side");
  return (
    <SceneCurtain as="section" className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-[1800px]">
        <span className="overline">{t("title")}</span>
        <WordStagger
          as="h1"
          text={t("title")}
          className="mt-4 font-display text-5xl tracking-tight sm:text-6xl lg:text-7xl"
        />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sumi-soft">{t("subtitle")}</p>
        <div className="my-12 flex items-center gap-6">
          <BrushDivider width={200} />
          <HankoStamp size={32} />
          <BrushDivider width={200} />
        </div>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="max-w-2xl">
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-9 border-l border-[color-mix(in_srgb,var(--color-brass)_25%,transparent)] pl-10">
            <div>
              <span className="overline">{ts("overline")}</span>
              <h2 className="mt-3 font-display text-2xl text-sumi">{ts("title")}</h2>
            </div>
            <dl className="flex flex-col gap-7">
              <div className="flex flex-col gap-1.5">
                <dt className="overline text-brass-deep">{ts("email_label")}</dt>
                <dd>
                  <a
                    href="mailto:info@akayalabs.com"
                    className="font-display text-xl text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
                  >
                    {ts("email_value")}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="overline text-brass-deep">{ts("address_label")}</dt>
                <dd className="font-display text-xl text-sumi">{ts("address_value")}</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="overline text-brass-deep">{ts("hours_label")}</dt>
                <dd className="font-display text-lg text-sumi">{ts("hours_value")}</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="overline text-brass-deep">{ts("response_label")}</dt>
                <dd className="font-display text-lg text-sumi">{ts("response_value")}</dd>
              </div>
            </dl>
            <div className="border-t border-[color-mix(in_srgb,var(--color-brass)_22%,transparent)] pt-7">
              <span className="overline">{ts("social_label")}</span>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href="https://linkedin.com/company/akayalabs"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mincho text-base text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com/akayalabs"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mincho text-base text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
                >
                  Instagram
                </a>
                <a
                  href="https://x.com/akayalabs"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mincho text-base text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
                >
                  X
                </a>
                <a
                  href="https://github.com/akayalabs"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mincho text-base text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
                >
                  GitHub
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SceneCurtain>
  );
}
