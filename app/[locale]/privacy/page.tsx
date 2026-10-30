import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { buildMetadata, BreadcrumbSchema } from "@/lib/seo";
import { WordStagger } from "@/components/motion/word-stagger";
import { SceneCurtain } from "@/components/motion/scene-curtain";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

const SECTIONS = ["controller", "form", "analytics", "measurement", "cookies", "transfer", "rights"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale, pathname: "/privacy", titleKey: "privacy.title", page: "privacy" });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <BreadcrumbSchema locale={locale} trail={[{ pathname: "/privacy", titleKey: "privacy.title" }]} />
      <PrivacyBody />
    </>
  );
}

function PrivacyBody() {
  const t = useTranslations("privacy");
  return (
    <SceneCurtain eager as="section" className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-[1800px]">
        <WordStagger
          as="h1"
          text={t("title")}
          className="font-display text-5xl tracking-tight sm:text-6xl lg:text-7xl"
        />
        <p className="mt-6 text-sm text-sumi-soft">{t("updated")}</p>
        <div className="mt-14 flex max-w-2xl flex-col gap-10">
          {SECTIONS.map((k) => (
            <section key={k}>
              <h2 className="font-display text-2xl text-sumi">{t(`sections.${k}.heading`)}</h2>
              <p className="mt-3 leading-relaxed text-sumi-soft">{t(`sections.${k}.body`)}</p>
              {k === "analytics" && (
                <div className="mt-5">
                  <CookieSettingsButton label={t("change_consent")} />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </SceneCurtain>
  );
}
