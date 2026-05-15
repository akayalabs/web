import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrushDivider } from "./ornaments/brush-divider";
import { HankoStamp } from "./ornaments/hanko-stamp";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  return (
    <footer className="w-full border-t border-[color-mix(in_srgb,var(--color-brass)_18%,transparent)] bg-cream-deep/40 px-6 py-20 text-sm text-sumi-soft sm:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Signature column */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <HankoStamp size={40} />
            <span className="font-display text-xl text-sumi">Akaya Labs</span>
          </div>
          <p className="max-w-sm leading-relaxed">{t("about")}</p>
          <Image
            src="/brand/signature.png"
            alt="Akaya Labs"
            width={320}
            height={320}
            className="mt-2 h-auto w-[140px] opacity-90"
          />
        </div>

        {/* Sitemap */}
        <div className="flex flex-col gap-4">
          <span className="overline">{t("sitemap")}</span>
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="hover:text-sumi">{tn("home")}</Link></li>
            <li><Link href="/products" className="hover:text-sumi">{tn("products")}</Link></li>
            <li><Link href="/about" className="hover:text-sumi">{tn("about")}</Link></li>
            <li><Link href="/contact" className="hover:text-sumi">{tn("contact")}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <span className="overline">{t("contact_label")}</span>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="mailto:info@akayalabs.com" className="text-sumi underline decoration-brass underline-offset-4 hover:decoration-brass-deep">
                info@akayalabs.com
              </a>
            </li>
            <li>{t("address")}</li>
            <li className="font-mincho text-xs uppercase tracking-[0.22em] text-brass-deep">
              {t("response_time")}
            </li>
          </ul>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <span className="overline">{t("social_label")}</span>
          <ul className="flex flex-col gap-2">
            <li><a href="https://linkedin.com/company/akayalabs" target="_blank" rel="noreferrer" className="hover:text-sumi">LinkedIn</a></li>
            <li><a href="https://instagram.com/akayalabs" target="_blank" rel="noreferrer" className="hover:text-sumi">Instagram</a></li>
            <li><a href="https://x.com/akayalabs" target="_blank" rel="noreferrer" className="hover:text-sumi">X</a></li>
            <li><a href="https://github.com/akayalabs" target="_blank" rel="noreferrer" className="hover:text-sumi">GitHub</a></li>
          </ul>
        </div>
      </div>

      <BrushDivider className="mx-auto my-14 max-w-[1800px]" width={260} />

      <div className="mx-auto flex max-w-[1800px] flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="font-mincho text-xs">{t("copyright")}</div>
        <div className="font-mincho text-xs uppercase tracking-[0.22em] text-brass-deep">EST. MMXXVI · RİZE, TR</div>
      </div>
    </footer>
  );
}
