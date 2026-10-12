import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrushDivider } from "@/components/ornaments/brush-divider";
import { HankoStamp } from "@/components/ornaments/hanko-stamp";

const LINKS = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "contact", href: "/contact" },
] as const;

export default function LocaleNotFound() {
  const t = useTranslations("not_found");
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-[1800px]">
        <span className="overline">{t("overline")}</span>
        <h1 className="mt-4 max-w-4xl font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">{t("title")}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sumi-soft">{t("body")}</p>
        <div className="my-12 flex items-center gap-6">
          <BrushDivider width={200} />
          <HankoStamp size={32} />
          <BrushDivider width={200} />
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="text-sm font-medium text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep"
            >
              {t(l.key)} →
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
