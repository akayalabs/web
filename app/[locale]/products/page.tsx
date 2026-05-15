import { setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { ProductsBody } from "./products-body";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale, pathname: "/products", titleKey: "products.title" });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsBody />;
}
