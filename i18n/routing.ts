import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "always",
  // hreflang metadata'dan gelir; middleware'in Link başlığı farklı bir x-default bildiriyordu.
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
