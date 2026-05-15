import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";
import { KurumsalDropdown } from "./kurumsal-dropdown";

export function Nav() {
  const t = useTranslations("nav");
  return (
    <header className="w-full px-6 py-7 sm:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" aria-label="Akaya Labs">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 opacity-90 transition group-hover:opacity-100"
          />
          <Image
            src="/brand/wordmark-tech.png"
            alt="akaya"
            width={1600}
            height={1600}
            className="h-auto w-[110px] object-contain"
          />
        </Link>
        <nav className="flex items-center gap-7 text-sm">
          <Link href="/products" className="transition hover:text-brass-deep">{t("products")}</Link>
          <KurumsalDropdown />
          <Link href="/contact" className="transition hover:text-brass-deep">{t("contact")}</Link>
          <span aria-hidden className="h-4 w-px self-center bg-[color-mix(in_srgb,var(--color-brass)_45%,transparent)]" />
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="ml-3 hidden rounded-sm bg-crimson px-5 py-2.5 text-sm font-medium tracking-wide text-cream shadow-[0_8px_20px_-10px_rgba(155,44,44,0.55)] transition hover:bg-[color-mix(in_srgb,var(--color-crimson)_82%,#000)] hover:shadow-[0_12px_28px_-12px_rgba(155,44,44,0.7)] md:inline-block"
          >
            {t("cta_primary")} →
          </Link>
        </nav>
      </div>
    </header>
  );
}
