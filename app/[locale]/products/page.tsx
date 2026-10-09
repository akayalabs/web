import { setRequestLocale } from "next-intl/server";
import { buildMetadata, BreadcrumbSchema, ProductsSchema, liveProductNames } from "@/lib/seo";
import { ProductsBody } from "./products-body";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    pathname: "/products",
    titleKey: "products.title",
    page: "products",
    descriptionValues: { names: await liveProductNames(locale) },
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <BreadcrumbSchema locale={locale} trail={[{ pathname: "/products", titleKey: "products.title" }]} />
      <ProductsSchema locale={locale} />
      <ProductsBody />
    </>
  );
}
