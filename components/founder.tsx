// TODO(karaca): verify LinkedIn + GitHub handles before launch (GitHub hesabı yeni açılacak)
import { useTranslations } from "next-intl";
import { BrushDivider } from "./ornaments/brush-divider";
import { HankoStamp } from "./ornaments/hanko-stamp";
import { ScrollReveal } from "./motion/scroll-reveal";

export function Founder() {
  const t = useTranslations("about.founder");
  return (
    <ScrollReveal as="section" className="mt-24">
      <div className="mb-12 flex items-center gap-6">
        <BrushDivider width={160} />
        <HankoStamp size={32} />
        <BrushDivider width={160} />
      </div>
      <span className="overline">{t("overline")}</span>
      <h3 className="mt-4 font-display text-3xl text-sumi">{t("name")}</h3>
      <p className="mt-1 font-mincho text-sm uppercase tracking-[0.22em] text-brass-deep">{t("role")}</p>
      <p className="mt-5 max-w-xl leading-relaxed text-sumi-soft">{t("bio")}</p>
      <div className="mt-7 flex flex-wrap gap-6 text-sm">
        <a href="mailto:info@akayalabs.com" className="underline decoration-brass underline-offset-4 hover:decoration-brass-deep">{t("cta_email")}</a>
        <a href="https://linkedin.com/in/ahmetkaracaa" target="_blank" rel="noreferrer" className="underline decoration-brass underline-offset-4 hover:decoration-brass-deep">{t("cta_linkedin")}</a>
        <a href="https://github.com/karacaahmet" target="_blank" rel="noreferrer" className="underline decoration-brass underline-offset-4 hover:decoration-brass-deep">{t("cta_github")}</a>
      </div>
    </ScrollReveal>
  );
}
